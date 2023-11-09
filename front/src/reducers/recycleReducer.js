import { createSlice } from "@reduxjs/toolkit";
import recycleService from "../services/recycles";

const recycleSlice = createSlice({
  name: "recycles",
  initialState: {
    recycles: [],
    loading: false,
    error: null,
  },
  reducers: {
    create(state, action) {
      const recycle = action.payload;
      state.push(recycle);
    },
    setRecycles(state, action) {
      state.recycles = action.payload;
      state.loading = false;
      state.error = null;
    },
    edit(state, action) {
      const updatedRecycle = action.payload;
      return state.map((item) =>
        item.id === updatedRecycle.id ? updatedRecycle : item
      );
    },

    remove(state, action) {
      const id = action.payload;
      return state.filter((recycles) => recycles.id !== id);
    },

    recyclesRequest(state) {
      state.loading = true;
      state.error = null;
    },

    recyclesRequestFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
    create,
    setRecycles,
    edit,
    remove,
    recyclesRequest,
    recyclesRequestFailure,
  } = recycleSlice.actions;

export const initializeRecycles = () => {
    return async (dispatch) => {
      try {
        dispatch(recyclesRequest());
        const recycles = await recycleService.getAll();
        dispatch(setRecycles(recycles));
      } catch (error) {
        dispatch(recyclesRequestFailure(error));
      }
    };
};
export const createRecycle = (recycle) => {
  return async (dispatch) => {
    const newRecycle = await recycleService.create(recycle);
    dispatch(create(newRecycle));
  };
};

export const updateRecycle = (updatedRecycle) => {
  return async (dispatch) => {
    const updatedRecycle1 = await recycleService.update(updatedRecycle);
    dispatch(edit(updatedRecycle1));
  };
};

export const deleteRecycle = (id) => {
  return async (dispatch) => {
    const response = await recycleService.remove(id);
    dispatch(remove(id));
  };
};


export const fetchRecyclesByBarcode = (barcode) => {
    return async (dispatch) => {
      try {
        dispatch(recyclesRequest());
        const recycles = await recycleService.getByBarcode(barcode);
        dispatch(setRecycles(recycles));
      } catch (error) {
        dispatch(recyclesRequestFailure(error));
      }
    };
  };
export default recycleSlice.reducer;
