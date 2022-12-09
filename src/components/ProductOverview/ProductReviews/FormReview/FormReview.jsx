import React, { useContext, useState } from "react";
import { ProductContext } from "../../../../context/ProductContext/ProductState";
import "./FormReview.scss";

const FormReview = (props) => {
    const { product, createReview, getProduct } = useContext(ProductContext);
    const [data, setData] = useState({
        content: "",
        rating: 1,
    });
    const setShowForm = props.setShowForm;

    const sendReview = async (e) => {
        e.preventDefault();
        await createReview(data.content, data.rating, product.id);
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
