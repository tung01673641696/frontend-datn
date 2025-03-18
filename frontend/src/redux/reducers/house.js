import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import HouseApi from "../../api/HouseApi";

export const houseByOwner = createAsyncThunk("house/houseByOwner", async (id) => {
  const listHouseByOwner = await HouseApi.getHouseByOwner(id);
  return listHouseByOwner;
});

export const addHouse = createAsyncThunk("house/addHouse", async (data) => {
  const addHouse = await HouseApi.addHouse(data);
  return addHouse
})


const HouseSlice = createSlice({
  name: "house",
  initialState: {
    listHouseByOwner: [],
    houseAddNew: []
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

      .addCase(addHouse.pending, (state, action) => {
        state.loading = true
      })
      .addCase(addHouse.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(addHouse.fulfilled, (state, action) => {
        state.loading = false
        state.houseAddNew = action.payload.data;
      })
  }
})

export default HouseSlice