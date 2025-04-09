/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";



type TCategoryId = {
  categoryId: null | string;
};

const initialState: TCategoryId = {
    categoryId: null,
};

const categorySlice = createSlice({
  name: "Category",
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      const { categoryId } = action.payload;
      state.categoryId = categoryId;
    },
   
  },
});

export const { setCategoryId } = categorySlice.actions;

export default categorySlice.reducer;

