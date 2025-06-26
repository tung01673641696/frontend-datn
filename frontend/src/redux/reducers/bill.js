import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import BillApi from "../../api/BillApi";


export const addBill = createAsyncThunk("bill/addBill", async (data) => {
  const addBill = await BillApi.addBill(data);
  return addBill
})

export const getAllServiceBill = createAsyncThunk(
  "bill/getAllServiceBill",
  async (filters = {}) => {
    const allServiceBill = await BillApi.getAllServiceBill(filters);
    return allServiceBill;
  }
);

export const updateStatusBill = createAsyncThunk(
  "bill/updateStatusBill",
  async ({ id }, { dispatch }) => {
    const res = await BillApi.updateStatusBill(id);
    dispatch(getAllServiceBill());
    return res;
  }
);

export const getDetailBill = createAsyncThunk(
  "bill/getDetailBill",
  async (id) => {
    const res = await BillApi.getDetailBill(id);
    return res.data.data;
  }
);

const BillSlice = createSlice({
  name: "bill",
  initialState: {
    allServiceBill: [],
    serviceBillDetail: {},
  },

  extraReducers: builder => {
    builder
      .addCase(getAllServiceBill.fulfilled, (state, action) => {
        state.loading = false
        state.allServiceBill = action.payload.data.data;
      })
    builder.addCase(getDetailBill.fulfilled, (state, action) => {
      state.serviceBillDetail = action.payload;
    })
  }


})

export default BillSlice