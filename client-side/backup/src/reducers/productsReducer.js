import {
  FETCH_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  FETCH_PRODUCT,
  UPDATE_PRODUCT,
} from "../actions/types";

const defaultState = {
  products: [],
  product: {
    title: "",
  },
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload.data],
      };
    case FETCH_PRODUCT:
      return {
        ...state,
        product: action.payload.data,
      };
    case UPDATE_PRODUCT:
      const product = action.payload.data;
      return {
        ...state,
        products: state.products.map((existingProduct) =>
          existingProduct._id === product._id ? product : existingProduct
        ),
      };
    case DELETE_PRODUCT:
      const _id = action.payload.data.productId;
      return {
        ...state,
        products: state.products.filter((product) => product._id !== _id),
      };
    default:
      return state;
  }
}
