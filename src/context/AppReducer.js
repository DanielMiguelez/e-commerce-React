const app = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                loading: true
            };
        case "GET_CATEGORIES":
            return {
                ...state,
                categories: action.payload,
                loading: false
            };
        case "GET_PRODUCTS":
            return {
                ...state,
                products: action.payload,
                loading: false
            };
        default:
            return state;
    }
};
export default app;