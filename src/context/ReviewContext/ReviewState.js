import React, { createContext, useReducer } from "react";
import ReviewReducer from "./ReviewReducer";
import axios from "axios";

const initialState = {
    review: null
};

export const ReviewContext = createContext(initialState);

export const ReviewProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ReviewReducer, initialState);
    const url = "http://localhost:3001";

    const createReview = async (content, rating, product_id, review_img) => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));

            const formData = new FormData();
            formData.append("content", content);
            formData.append("rating", rating);
            formData.append("product_id", product_id);
            if (review_img) formData.append("review_img", review_img);

            await axios.post(`${url}/reviews/createReview`, formData, {
                headers: {
                    authorization: token,
                },
            });

            dispatch({
                type: "CREATE_REVIEW"
            });
        } catch (error) {
            console.error(error);
        }
    };

    const deleteReview = async (review_id) => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            console.log(token);
            await axios.delete(`${url}/reviews/deleteReviewById/${review_id}`, {
                headers: {
                    authorization: token,
                },
            });

            dispatch({
                type: "DELETE_REVIEW"
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ReviewContext.Provider
            value={{
                review: state.review,
                createReview,
                deleteReview,
            }}
        >
            {children}
        </ReviewContext.Provider>
    );
};
