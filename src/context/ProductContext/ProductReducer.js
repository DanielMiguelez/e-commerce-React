const products = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                loading: true,
            };
        case "GET_CATEGORIES":
            return {
                ...state,
                categories: action.payload,
                loading: false,
            };
        case "GET_PRODUCTS":
            return {
                ...state,
                products: action.payload,
                loading: false,
            };
        case "GET_PRODUCT":
            return {
                ...state,
                product: action.payload,
                loading: false,
            };
        case "ADD_NEW_PRODUCT":
            return {
                ...state
            };
        case "DELETE_PRODUCT":
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload.id),
            };
        case "ADD_ONE_CART":
            return {
                ...state,
                cart: action.payload,
            };
        case "REMOVE_ONE_CART":
            return {
                ...state,
                cart: action.payload,
            };
        case "REMOVE_CART_PRODUCT":
            return {
                ...state,
                cart: action.payload,
            };
        case "CLEAR_CART":
            return {
                ...state,
                cart: [],
            };
        default:
    }
};
export default products;
