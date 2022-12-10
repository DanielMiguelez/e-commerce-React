import React, { useContext, useState } from "react";
import { ProductContext } from "../../../../context/ProductContext/ProductState";
import { ReviewContext } from "../../../../context/ReviewContext/ReviewState";
import { Image } from "antd";
import { CloseOutlined } from "@ant-design/icons"
import "./FormReview.scss";

const FormReview = (props) => {
    const { product, getProduct } = useContext(ProductContext);
    const { createReview, updateReview, review } = useContext(ReviewContext);
    const [data, setData] = useState({
        content: review ? review.content : "",
        rating: review ? review.rating : 1,
        src: review
            ? review.review_img
                ? "http://localhost:3001/" + review.review_img
                : null
            : null,
    });

    const [file, setFile] = useState();
    const setShowForm = props.setShowForm;
    const editForm = props.editForm;
    const setEditForm = props.setEditForm;

    const onSubmit = async (e) => {
        e.preventDefault();
        if(!editForm)
            await createReview(data.content, data.rating, product.id, file);
        else
            await updateReview(review.id, data.content, data.rating, product.id, file, data.src)
        setData({ content: "", rating: 1 });
        setShowForm(false);
        setEditForm(false);
        getProduct(product.id);
    };

    return (
        <div className="d-flex justify-content-center">
            <form className="form-writeReview" onSubmit={onSubmit}>
                <div>
                    <div className="header-form">
                        {editForm ? "Edit your review" : "Create your review"}
                    </div>
                    <div className="rating-review">
                        <span>Rating:</span>
                        <div id="review-stars">
                            {[1, 2, 3, 4, 5].map((number, idx) =>
                                number <= data.rating ? (
                                    <span
                                        onClick={() =>
                                            setData({ ...data, rating: number })
                                        }
                                        key={idx}
                                        role="button"
                                        className="fa fa-star checked"
                                    ></span>
                                ) : (
                                    <span
                                        onClick={() =>
                                            setData({ ...data, rating: number })
                                        }
                                        role="button"
                                        key={idx}
                                        className="fa fa-star"
                                    ></span>
                                )
                            )}
                        </div>
                    </div>
                </div>
                <textarea
                    className="form-control textarea-review"
                    rows="3"
                    value={data.content}
                    onChange={(e) =>
                        setData({ ...data, content: e.target.value })
                    }
                    placeholder="Write your review here..."
                ></textarea>

                <div className="upload-container d-flex justify-content-center align-items-center">
                    <div className="file file--upload">
                        <label htmlFor="input-file">
                            <i className="material-icons">cloud_upload</i>Upload
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
                                <button className="btn btn-danger d-flex align-items-center m-2" 
                                        onClick={(e) => {
                                            setFile(undefined);
                                            setData({...data, src: null})
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
                                <button className="btn btn-danger d-flex align-items-center m-2" 
                                        onClick={(e) => {
                                            setFile(undefined);
                                            setData({...data, src: null})
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

                <div className="buttons-review">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                            setShowForm(false);
                            setEditForm(false);
                        }}
                    >
                        Close
                    </button>
                    <button type="submit" className={`btn ${editForm ? "btn-success" : "btn-primary"}`}>{ editForm ? "Update" : "Create"}</button>
                </div>
            </form>
        </div>
    );
};

export default FormReview;
