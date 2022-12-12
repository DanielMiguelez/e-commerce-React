const reviews = (state, action) => {
    switch (action.type) {
        case "CREATE_REVIEW":
            return {
                ...state,
            };
        case "GET_REVIEW":
            return {
                ...state,
                review: action.payload,
            };
        case "UPDATE_REVIEW":
            return {
                ...state,
                review: null,
            };
        case "DELETE_REVIEW":
            return {
                ...state,
                review: null,
            };
        default:
    }
};
export default reviews;
