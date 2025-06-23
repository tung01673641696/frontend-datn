import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import BillApi from "../../api/BillApi";


export const addBill = createAsyncThunk("bill/addBill", async (data) => {
  const addBill = await BillApi.addBill(data);
  return addBill
})

const BillSlice = createSlice({
  name: "bill",
  initialState: {

  },

})

export default BillSlice