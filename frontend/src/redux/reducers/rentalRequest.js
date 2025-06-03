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

export const rejectRentalRequest = createAsyncThunk(
  'rentalRequest/rejectRentalRequest',
  async (id) => {
    const rejectRentalRequest = await RentalRequestApi.RejectRentalRequest(id);
    return rejectRentalRequest
  }
);

export const approveRentalRequest = createAsyncThunk(
  'rentalRequest/approveRentalRequest',
  async (id) => {
    const response = await RentalRequestApi.ApproveRentalRequest(id);
    return response;
  }
);


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

      .addCase(rejectRentalRequest.fulfilled, (state, action) => {
        const rejectedId = action.meta.arg;
        const index = state.allRentalRequest.findIndex(item => item.id === rejectedId);
        if (index !== -1) {
          state.allRentalRequest[index].status = 'reject';
        }
        toast.success("Đã từ chối yêu cầu giữ phòng");
      })

      .addCase(approveRentalRequest.fulfilled, (state, action) => {
        const approvedId = action.meta.arg;
        const index = state.allRentalRequest.findIndex(item => item.id === approvedId);
        if (index !== -1) {
          state.allRentalRequest[index].status = 'approved';
        }
        toast.success("Đã xác nhận yêu cầu giữ phòng");
      })

  }

})

export default RentalRequestSlice