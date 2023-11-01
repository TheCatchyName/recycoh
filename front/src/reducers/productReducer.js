import { createSlice } from "@reduxjs/toolkit";
import productService from "../services/products";

const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    create(state, action) {
      const product = action.payload;
      state.push(product);
    },
    setProducts(state, action) {
      return action.payload;
    },
    edit(state, action) {
      const updatedProduct = action.payload;
      return state.map((item) =>
        item.id === updatedProduct.id ? updatedProduct : item
      );
    },

    remove(state, action) {
      const id = action.payload;
      return state.filter((products) => products.id !== id);
    },
    comment(state, action) {
      const updatedProduct = action.payload;
      return state.map((item) =>
        item.id === updatedProduct.id ? updatedProduct : item
      );
    },
  },
});

export const { create, setProducts, edit, remove } = productSlice.actions;

export const initializeProducts = () => {
  return async (dispatch) => {
    const products = await productService.getAll();
    dispatch(setProducts(products));
  };
};
export const createProduct = (product) => {
  return async (dispatch) => {
    const newProduct = await productService.create(product);
    dispatch(create(newProduct));
  };
};

export const updateProduct = (updatedProduct) => {
  return async (dispatch) => {
    const updatedProduct1 = await productService.update(updatedProduct);
    dispatch(edit(updatedProduct1));
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    const response = await productService.remove(id);
    dispatch(remove(id));
  };
};

export const commentProduct = (comment, id) => {
  const formattedComment = {
    content: comment,
  };
  return async (dispatch) => {
    const response = await productService.postComment(formattedComment, id);
    dispatch(edit(response));
  };
};

export default productSlice.reducer;
