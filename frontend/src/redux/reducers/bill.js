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
    const query = new URLSearchParams(filters).toString();
    const allServiceBill = await BillApi.getAllServiceBill(query);
    return allServiceBill;
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