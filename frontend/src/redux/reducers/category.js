import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import CategoryApi from "../../api/CategoryApi";

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async () => {
    const categoryList = await CategoryApi.getAllCategory();
    return categoryList
  }
)

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: [],
    loadingCategory: false
  },
  reducers: {
  },

  extraReducers: builder => {
    builder
      .addCase(getCategory.pending, (state, action) => {
        state.loadingCategory = true
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loadingCategory = false
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loadingCategory = false
        state.category = action.payload.data;
      })
  }
})

export default categorySlice
