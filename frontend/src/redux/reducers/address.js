import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import AddressApi from '../../api/AddressApi'

export const getDistrict = createAsyncThunk(
  "address/getDistrict",
  async () => {
    const districtList = await AddressApi.getAllDistrict();
    return districtList
  }
)

export const getWard = createAsyncThunk(
  "address/getWard",
  async (id) => {
    const response = await AddressApi.getWard(id);
    return response
  }
)

const addressSlice = createSlice({
  name: "address",
  initialState: {
    district: [],
    ward: [],
    loadingAddress: false
  },
  reducers: {
  },

  extraReducers: builder => {
    builder
      .addCase(getDistrict.fulfilled, (state, action) => {
        state.loadingAddress = false
        state.district = action.payload.data;
      })
      .addCase(getWard.fulfilled, (state, action) => {
        state.loadingAddress = false
        state.ward = action.payload.data;
      })
  }
})

export default addressSlice
