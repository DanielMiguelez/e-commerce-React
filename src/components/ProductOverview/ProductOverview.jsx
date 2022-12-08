import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext/ProductState";
import { Image } from 'antd';
import "./ProductOverview.scss";
import ProductReviews from "./ProductReviews/ProductReviews";
import { getAverageRating, printReviewsStar } from "../../utils/rating";

const ProductOverview = () => {
    const { id } = useParams();
    const { getProduct, product, addCart } = useContext(ProductContext);

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
                        {product && product.Reviews?.length ? (
                            <div>
                                { printReviewsStar(getAverageRating(product)) }
                                <span>({product.Reviews.length})</span>
                            </div>
                        ) : null}
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
