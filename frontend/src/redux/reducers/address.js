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
      .addCase(getDistrict.pending, (state, action) => {
        state.loadingAddress = true
      })
      .addCase(getDistrict.rejected, (state, action) => {
        state.loadingAddress = false
      })
      .addCase(getDistrict.fulfilled, (state, action) => {
        state.loadingAddress = false
        state.district = action.payload.data;
      })
  }
})

export default addressSlice
