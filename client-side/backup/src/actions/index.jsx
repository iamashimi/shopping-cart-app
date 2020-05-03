import axios from "axios";
import {
  FETCH_USER,
  ADD_PRODUCT,
  FETCH_PRODUCT,
  DELETE_PRODUCT,
  FETCH_PRODUCTS,
//   ADD_CATEGORY,
//   FETCH_CATEGORY,
  UPDATE_PRODUCT,
//   SEARCH_CATEGORY,
} from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/admin/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const addProduct = (product) => async (dispatch) => {
  const req = await axios.post("/admin/add-product", product);

  dispatch({ type: ADD_PRODUCT, payload: req });
};

export const fetchProduct = (productId) => async (dispatch) => {
  const res = await axios.get(`/admin/product/${productId}`);

  dispatch({ type: FETCH_PRODUCT, payload: res });
};

export const updateProduct = (product) => async (dispatch) => {
  const res = await axios.put(`/admin/update-product/${product._id}`, product);

  dispatch({ type: UPDATE_PRODUCT, payload: res });
};

export const deleteProduct = (productId) => async (dispatch) => {
  const res = await axios.delete(`/admin/delete-product/${productId}`);
  dispatch({ type: DELETE_PRODUCT, payload: res });
};

export const fetchProducts = () => async (dispatch) => {
  const res = await axios.get("/admin/product");

  dispatch({ type: FETCH_PRODUCTS, payload: res.data });
};

// export const addAsset = (asset) => async (dispatch) => {
//   const req = await axios.post("/api/assets", asset);

//   dispatch({ type: ADD_CATEGORY, payload: req });
// };

// export const fetchAssets = () => async (dispatch) => {
//   const res = await axios.get("/api/assets");

//   dispatch({ type: FETCH_CATEGORY, payload: res.data });
// };

// export const searchAssets = (queryData) => async (dispatch) => {
//   const res = await axios.post("/api/assets/search", queryData);

//   dispatch({ type: SEARCH_CATEGORY, payload: res.data });
// };
