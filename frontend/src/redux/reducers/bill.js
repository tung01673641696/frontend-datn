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

const BillSlice = createSlice({
  name: "bill",
  initialState: {
    allServiceBill: []
  },

  extraReducers: builder => {
    builder
      .addCase(getAllServiceBill.fulfilled, (state, action) => {
        state.loading = false
        state.allServiceBill = action.payload.data.data;
      })
  }


})

export default BillSlice