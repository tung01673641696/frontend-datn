import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import HouseApi from "../../api/HouseApi";

export const houseByOwner = createAsyncThunk("house/houseByOwner", async (id) => {
  const listHouseByOwner = await HouseApi.getHouseByOwner(id);
  return listHouseByOwner;
});


const HouseSlice = createSlice({
  name: "house",
  initialState: {
    listHouseByOwner: [],
  },
  extraReducers: builder => {
    builder
      .addCase(houseByOwner.pending, (state, action) => {
        state.loading = true
      })
      .addCase(houseByOwner.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(houseByOwner.fulfilled, (state, action) => {
        state.loading = false
        state.listHouseByOwner = action.payload.data;
      })
  }
})

export default HouseSlice