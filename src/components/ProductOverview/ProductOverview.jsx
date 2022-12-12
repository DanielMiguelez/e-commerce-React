import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext/ProductState";
import { Image } from 'antd';
import { ShoppingCartOutlined } from "@ant-design/icons"
import "./ProductOverview.scss";
import ProductReviews from "./ProductReviews/ProductReviews";
import { getAverageRating, printReviewsStar } from "../../utils/rating";
import { UserContext } from "../../context/UserContext/UserState";

const ProductOverview = () => {
    const { id } = useParams();
    const { getProduct, product, addOneCart } = useContext(ProductContext);
    const { addProductToFavourites, removeProductFromFavourites, user, getUserInfo } = useContext(UserContext);
    const navigate = useNavigate();

    const handleFavourites = async () => {
        if(user) {
            if(userAlreadyFavouriteProduct()) {
                await removeProductFromFavourites(product.id);
                getUserInfo();
            } else {
                await addProductToFavourites(product.id);
                getUserInfo();
            }
        }
        else {
            navigate(
                "/login",
                {
                    state: {
                        nextUrl: `product-overview/${product.id}`
                    }
                }
            );
        }
    }

    const userAlreadyFavouriteProduct = () => {
        if(!user || !product)
            return false;
        const productFavouritesIds = user.FavouriteProductsList.map((productFavourite) => productFavourite.id);
        return productFavouritesIds.includes(product.id);
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
                        <div className="align-self-center buttons-container">
                            <button
                                className="add-cart align-self-center btn btn-primary"
                                onClick={() => addOneCart(product)}
                            >
                                Add to the cart <ShoppingCartOutlined />
                            </button>

                            <button
                                className="add-cart align-self-center btn favourites"
                                onClick={handleFavourites}
                            >
                                {userAlreadyFavouriteProduct() ? "Remove" : "Add"} <img src={require("../../assets/white_heart.png")} alt="Heart" />
                            </button>
                        </div>
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
