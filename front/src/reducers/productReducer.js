import { createSlice } from "@reduxjs/toolkit";
import productService from "../services/products";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    create(state, action) {
      // const product = action.payload;
      state.products = [...state.products, action.payload]; // Add the new product to the products array
    },
    setProducts(state, action) {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
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

    productsRequest(state) {
      state.loading = true;
      state.error = null;
    },

    productsRequestFailure(state, action) {
      state.loading = false;
      state.error = action.payload.message  ;
    },
  },
});

export const {
    create,
    setProducts,
    edit,
    remove,
    productsRequest,
    productsRequestFailure,
  } = productSlice.actions;

export const initializeProducts = () => {
    return async (dispatch) => {
      try {
        dispatch(productsRequest());
        const products = await productService.getAll();
        dispatch(setProducts(products));
      } catch (error) {
        dispatch(productsRequestFailure(error));
      }
    };
};
export const createProduct = (product) => {
  return async (dispatch) => {
    const newProduct = await productService.create(product);
    console.log("reducer here")
    console.log(newProduct)
    dispatch(create(newProduct));
    return newProduct
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


export const fetchProductsByBarcode = (barcode) => {
    return async (dispatch) => {
      try {
        dispatch(productsRequest());
        const products = await productService.getByBarcode(barcode);
        dispatch(setProducts(products));
      } catch (error) {
        dispatch(productsRequestFailure(error));
      }
    };
  };
export default productSlice.reducer;
