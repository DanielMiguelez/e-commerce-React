import React, { useContext } from "react";
import { ProductContext } from "../../../context/ProductContext/ProductState.js";
import "./Product.scss";
import { useNavigate } from "react-router-dom";
import { Empty } from 'antd';
import { getAverageRating, printReviewsStar } from "../../../utils/rating.js";

const Product = (props) => {
    const { products } = useContext(ProductContext);
    const navigate = useNavigate();
    const rating_filter = props.rating_filter;

    const goProductOverview = (id) => {
        navigate(`/product-overview/${id}`);
    };

    const productCards = products
        .filter(product => {
            if(rating_filter !== 6) {
                if(product.Reviews.length > 0)
                    return (getAverageRating(product) >= rating_filter)
                else
                    return false;
            } else {
                return true;
            }
        })
        .map((product) => {
            return (
                <div
                    className="product-card"
                    onClick={() => goProductOverview(product.id)}
                    key={product.id}
                >
                    <div className="product-img">
                        <img
                            className="card-img"
                            src={"http://localhost:3001/" + product.img_product}
                            alt="Product"
                        />
                    </div>
                    <div className="product-name">{product.name}</div>
                    {product.Reviews.length ? (
                        <div>
                            {printReviewsStar(getAverageRating(product))}
                            <span>({product.Reviews.length})</span>
                        </div>
                    ) : null}
                    <div className="product-price">{product.price}$</div>
                </div>
            );
        });



    return (
        <>
            {   
                productCards.length ? 
                productCards 
                :   
                    <div className="d-flex flex-column align-items-center no-products">
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                        <span>There are no products for those filters...</span>
                    </div>
            }
        </>
    );
};

export default Product;
