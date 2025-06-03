import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import RentalRequestApi from "../../api/RentalRequestApi";
import { toast } from "react-toastify";

export const rentalRequest = createAsyncThunk("rentalRequest", async ({ userId, roomId }, { rejectWithValue }) => {
  try {
    const response = await RentalRequestApi.rentalRequest(userId, roomId);
    return response;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
})

export const getAllRentalRequest = createAsyncThunk("rentalRequest/getAllRentalRequest", async (userId) => {
  const AllRentalRequest = await RentalRequestApi.getAllRentalRequest(userId);
  return AllRentalRequest
})

const RentalRequestSlice = createSlice({
  name: "rental_request",

  initialState: {
    allRentalRequest: []
  },

  extraReducers: builder => {
    builder
      .addCase(getAllRentalRequest.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getAllRentalRequest.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(getAllRentalRequest.fulfilled, (state, action) => {
        state.loading = false
        state.allRentalRequest = action.payload.data.data;
      })
  }

})

export default RentalRequestSlice