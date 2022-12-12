import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { ProductContext } from "../../context/ProductContext/ProductState";
import { Modal, Image } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "./Admin.scss";

const Admin = () => {
    const {
        getCategories,
        getProducts,
        getProduct,
        product,
        products,
        deleteProduct,
        updateProduct,
        categories,
        addNewProduct,
    } = useContext(ProductContext);
    const [search, setSearch] = useState("");
    const [file, setFile] = useState();
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState({
        name: "",
        category: 1,
        desc: "",
        price: 0,
        src: null,
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const showModal = async () => {
        setData({
            name: "",
            category: 1,
            desc: "",
            price: 0,
            src: "",
        });
        setFile();
        setEdit(false);
        setOpen(true);
    };

    const goEdit = async (id) => {
        const product = await getProduct(id);
        setData({
            name: product.name,
            category: product.category_id,
            desc: product.description,
            price: product.price,
            src: "http://localhost:3001/" + product.img_product,
        });
        setEdit(true);
        setOpen(true);
        setFile();
    };

    const handleOk = async () => {
        let ok = false;
        if (!edit) {
            ok = await addNewProduct(
                data.name,
                data.price,
                data.desc,
                data.category,
                file
            );
        } else {
            if (data.src === "" && !file) return;
            ok = await updateProduct(
                product.id,
                data.name,
                data.price,
                data.desc,
                data.category,
                file
            );
        }

        if (ok) {
            setSearch("");
            await getProducts(search, 0, 1, 9999, "");
            setOpen(false);
        }
    };

    const hideModal = async () => {
        setOpen(false);
    };

    useEffect(() => {
        getCategories();
        getProducts(search, 0, 1, 9999, "");
        // eslint-disable-next-line
    }, [search]);

    const categoriesList = !categories
        ? null
        : categories.map((category, i) => {
              return (
                  <option key={i} value={category.id}>
                      {category.name}
                  </option>
              );
          });

    const productsList = !products
        ? null
        : products.map((product, idx) => {
              return (
                  <tr key={idx}>
                      <td>
                          <img
                              src={
                                  "http://localhost:3001/" + product.img_product
                              }
                              alt="Product"
                          />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.Category.name}</td>
                      <td>{product.price}$</td>
                      <td>
                          <div className="d-flex flex-column actions">
                              <button
                                  className="btn btn-success"
                                  onClick={() => goEdit(product.id)}
                              >
                                  Edit{" "}
                                  <i
                                      className="fa fa-pencil"
                                      aria-hidden="true"
                                  ></i>
                              </button>
                              <button
                                  onClick={() => deleteProduct(product)}
                                  className="btn btn-danger"
                              >
                                  Delete{" "}
                                  <i
                                      className="fa fa-trash"
                                      aria-hidden="true"
                                  ></i>
                              </button>
                          </div>
                      </td>
                  </tr>
              );
          });

    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center mt-3 mb-3 admin-container">
                <div className="admin-header">
                    <span>Admin</span>
                </div>
                <div className="admin-form">
                    <form>
                        <input
                            className="form-control"
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Filter product by name..."
                        />
                    </form>
                </div>
                <div className="d-flex justify-content-center">
                    <button onClick={showModal} className="btn btn-primary">
                        Add new product
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{products ? productsList : null}</tbody>
                </table>
            </div>
            <Modal
                title={edit ? "Update product" : "Add new product"}
                centered
                open={open}
                onOk={handleOk}
                onCancel={hideModal}
                okText={!edit ? "Send" : "Update"}
                cancelText="Cancel"
            >
                <form className="form-product">
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={data.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="category">Category:</label>
                        <select
                            className="form-select"
                            name="category"
                            value={data.category}
                            onChange={handleChange}
                        >
                            {categoriesList}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            step=".01"
                            className="form-control"
                            value={data.price}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="desc">Description:</label>
                        <textarea
                            id="desc"
                            rows="3"
                            name="desc"
                            className="form-control"
                            value={data.desc}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="upload-container d-flex justify-content-center align-items-center">
                        <div className="file file--upload">
                            <label htmlFor="input-file">
                                <i className="material-icons">cloud_upload</i>
                                Upload
                            </label>
                            <input
                                id="input-file"
                                accept="image/png, image/jpg, image/jpeg"
                                type="file"
                                onChange={(e) => {
                                    setData({ ...data, src: null });
                                    setFile(e.target.files[0]);
                                }}
                            />
                        </div>

                        <div className="d-flex align-items-center">
                            {file ? (
                                <>
                                    <Image
                                        height={"100px"}
                                        src={URL.createObjectURL(file)}
                                        alt="review-img"
                                    />
                                    <button
                                        className="btn btn-danger d-flex align-items-center m-2"
                                        onClick={(e) => {
                                            setFile(undefined);
                                            setData({ ...data, src: null });
                                        }}
                                    >
                                        <CloseOutlined />
                                    </button>
                                </>
                            ) : data.src ? (
                                <>
                                    <Image
                                        height={"100px"}
                                        src={data.src}
                                        alt="review-img"
                                    />
                                    <button
                                        className="btn btn-danger d-flex align-items-center m-2"
                                        onClick={(e) => {
                                            setFile(undefined);
                                            setData({ ...data, src: null });
                                        }}
                                    >
                                        <CloseOutlined />
                                    </button>
                                </>
                            ) : (
                                <span>No image attached</span>
                            )}
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default Admin;
