const reviews = (state, action) => {
    switch (action.type) {
        case "CREATE_REVIEW":
            return {
                ...state,
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
