import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import HouseApi from "../../api/HouseApi";
import { toast } from "react-toastify";

export const houseByOwner = createAsyncThunk("house/houseByOwner", async (id) => {
  const listHouseByOwner = await HouseApi.getHouseByOwner(id);
  return listHouseByOwner;
});

export const addHouse = createAsyncThunk("house/addHouse", async (data) => {
  const addHouse = await HouseApi.addHouse(data);
  return addHouse
})

export const getOneHouse = createAsyncThunk("house/getOneHouse", async (houseId) => {
  const one = await HouseApi.getOneHouse(houseId);
  return one
})

export const deleteHouse = createAsyncThunk("house/deleteHouse", async ({ houseId, id }, thunkApi) => {
  const deleteHouse = await HouseApi.deleteHouse(houseId)

  if (deleteHouse.status === 200) {
    toast.success("Xóa nhà thành công");
    thunkApi.dispatch(houseByOwner(id))
  } else {
    toast.error("Xóa nhà thất bại");
  }
  return deleteHouse
})


const HouseSlice = createSlice({
  name: "house",
  initialState: {
    listHouseByOwner: [],
    houseAddNew: [],
    oneHouse: {}
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

      .addCase(getOneHouse.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getOneHouse.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(getOneHouse.fulfilled, (state, action) => {
        state.loading = false
        state.oneHouse = action.payload.data;
      })
  }
})

export default HouseSlice