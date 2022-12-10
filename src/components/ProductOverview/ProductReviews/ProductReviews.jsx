import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../../context/ProductContext/ProductState";
import { UserContext } from "../../../context/UserContext/UserState";
import { printReviewsStar } from "../../../utils/rating";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons"
import { Image } from "antd";
import "./ProductReviews.scss";
import FormReview from "./FormReview/FormReview";
import { ReviewContext } from "../../../context/ReviewContext/ReviewState";

const ProductReviews = () => {
    const { product, getProduct } = useContext(ProductContext);
    const { deleteReview, getReview } = useContext(ReviewContext);
    const { token, user, getUserInfo, likeReview, removeLikeReview } = useContext(UserContext);
    const [ showForm, setShowForm ] = useState(false);
    const [ editForm, setEditForm ] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(token)
            getUserInfo();
        // eslint-disable-next-line
    }, []);

    const goDeleteReview = async (e, review_id) => {
        e.preventDefault();
        await deleteReview(review_id);
        getProduct(product.id);
    };

    const showFormReview = () => {
        if (token) {
            setEditForm(false);
            setShowForm(true);
        } else {
            navigate("/login");
        }
    };

    const userAlreadyReviewProduct = () => {
        if(!user)
            return false;
        const authorIds = product.Reviews.map((review) => review.User.id);
        return authorIds.includes(user.id);
    };

    const userInReviewLikes = (review) => {
        if(!user)
            return false;
        const userIds = review.ReviewsLiked.map((user) => user.id);
        console.log(userIds);
        return userIds.includes(user.id);
    };

    const handleReviewLike = async (review) => {
        if(user) {
            if(userInReviewLikes(review)) {
                console.log("entra 1");
                await removeLikeReview(review.id);
            } else {
                console.log("entra 2");
                await likeReview(review.id);
            }
            getProduct(product.id);
        } else {
            navigate("/login");
        }
    }

    const reviewsLIst = product.Reviews.map((review, idx) => {
        return (
            <div
                key={idx}
                className={
                    user && user.id === review.User.id
                        ? `review-wrapper order-1 mt-4 ${editForm ? "d-none" : "d-block"}`
                        : "review-wrapper order-2"
                }
            >
                {user && user.id === review.User.id ? (
                    <div className="d-flex justify-content-center">
                        <span className="your-review">Your review</span>
                    </div>
                ) : null}
                <div className="user-review">
                    <div className="user-icon-container">
                        <img
                            src={
                                "http://localhost:3001/" + review.User.user_img
                            }
                            alt="User Img"
                        />
                    </div>
                    <div className="review-desc">
                        <div className="header d-flex">
                            <span className="author">{review.User.name}</span>
                            <div className="header-separator">-</div>
                            <div className="review-stars">
                                {printReviewsStar(review.rating)}
                            </div>
                            <div>
                                <span className="date">
                                    {review.updatedAt.slice(8, 10) +
                                        "/" +
                                        review.updatedAt.slice(5, 7) +
                                        "/" +
                                        review.updatedAt.slice(0, 4)}
                                </span>
                            </div>
                        </div>
                        <div className="content">{review.content}</div>
                        {review.review_img ? (
                            <div className="review_img">
                                <Image
                                    height={"100%"}
                                    src={
                                        "http://localhost:3001/" +
                                        review.review_img
                                    }
                                    alt="Product"
                                />
                            </div>
                        ) : null}
                        <div className="d-flex feedback-buttons">
                            <button onClick={() => handleReviewLike(review)} className="btn">{userInReviewLikes(review) ? <><span>Remove my like</span> <DislikeOutlined /></> : <><span>Useful opinion</span> <LikeOutlined /></>} <span>({review.ReviewsLiked.length})</span></button>
                            <button className="btn">Reply <i className="fa fa-reply" aria-hidden="true"></i> </button>
                            <button className="btn">Report <i className="fa fa-exclamation-triangle" aria-hidden="true"></i> </button>
                        </div>
                        {user && user.id === review.User.id ? (
                            <div className="d-flex justify-content-center buttons-my-review">
                                <button onClick={async (e) => {
                                            await getReview(review.id)
                                            setEditForm(true);
                                            setShowForm(true);
                                        }} 
                                        className="btn btn-success">
                                    Edit my review
                                </button>
                                <button
                                    onClick={(e) =>
                                        goDeleteReview(e, review.id)
                                    }
                                    className="btn btn-danger"
                                >
                                    Delete my review
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    });
    return (
        <>
            {!userAlreadyReviewProduct() || editForm ? (
                showForm ? (
                    <FormReview setShowForm={setShowForm} editForm={editForm} setEditForm={setEditForm}/>
                ) : (
                    <div className="d-flex justify-content-center p-4">
                        <button
                            className="btn btn-primary"
                            onClick={showFormReview}
                        >
                            Create your own review
                        </button>
                    </div>
                )
            ) : (
                null
            )}
            <div className="reviews-container d-flex flex-column align-items-center">
                {reviewsLIst}
            </div>
        </>
    );
};

export default ProductReviews;
