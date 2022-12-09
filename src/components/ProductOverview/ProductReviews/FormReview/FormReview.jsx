import React, { useContext, useState } from "react";
import { ProductContext } from "../../../../context/ProductContext/ProductState";
import { ReviewContext } from "../../../../context/ReviewContext/ReviewState";
import "./FormReview.scss";

const FormReview = (props) => {
    const { product, getProduct } = useContext(ProductContext);
    const { createReview } = useContext(ReviewContext);
    const [data, setData] = useState({
        content: "",
        rating: 1,
    });
    const [file, setFile] = useState()
    const setShowForm = props.setShowForm;

    const sendReview = async (e) => {
        e.preventDefault();
        await createReview(data.content, data.rating, product.id, file);
        setData({ content: "", rating: 1 });
        setShowForm(false);
        getProduct(product.id);
    };

    return (
        <div className="d-flex justify-content-center">
            <form className="form-writeReview" onSubmit={sendReview}>
                <div>
                    <div className="rating-review">
                        <b>Rating:</b>
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
                        <input id="input-file" accept="image/png, image/jpg, image/jpeg" type="file" onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <div>
                        { file ? <img src={URL.createObjectURL(file)} alt="review-img"/> : <span>No image attached</span>}
                    </div>
                </div>

                <div className="buttons-review">
                    <button
                        className="btn btn-secondary"
                        onClick={() => setShowForm(false)}
                    >
                        Close
                    </button>
                    <button className="btn btn-primary">Send</button>
                </div>
            </form>
        </div>
    );
};

export default FormReview;
