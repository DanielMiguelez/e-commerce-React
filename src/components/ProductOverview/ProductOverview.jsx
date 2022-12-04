import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext/ProductState";
import { Image } from 'antd';
import "./ProductOverview.scss";
import ProductReviews from "./ProductReviews/ProductReviews";

const ProductOverview = () => {
    const { id } = useParams();
    const { getProduct, product, addCart } = useContext(ProductContext);

    const getInfoRating = () => {
        const number_reviews = product.Reviews.length;
        const sum_rating = product.Reviews.map(
            (review) => review.rating
        ).reduce((a, b) => a + b);
        const average_rating = sum_rating / number_reviews;

        return [Math.round(average_rating), number_reviews];
    };

    const getReviewsStar = () => {
        if (product.Reviews.length > 0) {
            const info_rating = getInfoRating(product);

            return (
                <div>
                    {[1, 2, 3, 4, 5].map((number, idx) =>
                        number <= info_rating[0] ? (
                            <span
                                key={idx}
                                className="fa fa-star checked"
                            ></span>
                        ) : (
                            <span key={idx} className="fa fa-star"></span>
                        )
                    )}
                    <span>({info_rating[1]})</span>
                </div>
            );
        } else {
            return null;
        }
    };

    useEffect(() => {
        getProduct(id);
		// eslint-disable-next-line
    }, []);

    return (
        <div className="product-overview">
            <div className="product-overview-container">
                <div className="product-overview-info">
                    <div className="product-img d-flex justify-content-center align-items-center">
                        {product ? (
                            <Image
								width={'65%'}
                                src={
                                    "http://localhost:3001/" +
                                    product.img_product
                                }
                                alt="Product"
                            />
                        ) : null}
                    </div>
                    <div className="product-description d-flex flex-column justify-content-around">
                        <span className="name">
                            {product ? product.name : null}
                        </span>
                        <div>{product ? getReviewsStar() : null}</div>
                        <span className="desc">
                            {product ? product.description : null}
                        </span>
                        <span className="price">
                            {product ? product.price : null}$
                        </span>
                        <button
                            className="add-cart align-self-center btn btn-primary"
                            onClick={() => addCart(product)}
                        >
                            Add Cart
                        </button>
                    </div>
                </div>
                <div className="reviews mt-4 d-flex flex-column">
                    <span className="reviews-header">Reviews</span>
                    { product ? <ProductReviews /> : null}
                </div>
            </div>
        </div>
    );
};

export default ProductOverview;
