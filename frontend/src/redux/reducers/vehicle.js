import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import VehicleApi from "../../api/VehicleApi";
import { toast } from "react-toastify";

export const addVehicle = createAsyncThunk("vehicle/addVehicle", async (data) => {
  const addVehicle = await VehicleApi.addVehicle(data);
  return addVehicle
})

export const getAllVehicle = createAsyncThunk("vehicle/getAllVehicle", async () => {
  const getAllVehicle = await VehicleApi.getAllVehicle();
  return getAllVehicle
})

export const deleteVehicle = createAsyncThunk("vehicle/deleteVehicle", async (vehicleId, thunkApi) => {
  const deleteVehicle = await VehicleApi.deleteVehicle(vehicleId)

  if (deleteVehicle.status === 200) {
    toast.success("Xóa phương tiện thành công");
    thunkApi.dispatch(getAllVehicle())
  } else {
    toast.error("Xóa phương tiện thất bại");
  }
  return deleteVehicle
})

export const getOneVehicle = createAsyncThunk("vehicle/getOneVehicle", async (vehicleId) => {
  const getOneVehicle = await VehicleApi.getOneVehicle(vehicleId);
  return getOneVehicle
})

export const editVehicle = createAsyncThunk("vehicle/editVehicle", async ({ vehicleId, data }) => {
  const editVehicle = await VehicleApi.editVehicle(vehicleId, data);
  if (editVehicle.status === 200) {
    toast.success("Cập nhật phương tiện thành công");
  }
  return editVehicle
})

const VehicleSlice = createSlice({
  name: "vehicle",
  initialState: {
    allVehicle: [],
    oneVehicle: {},
  },
  extraReducers: builder => {
    builder
      .addCase(getAllVehicle.fulfilled, (state, action) => {
        state.loading = false
        state.allVehicle = action.payload.data;
      })
      .addCase(getOneVehicle.fulfilled, (state, action) => {
        state.loading = false
        state.oneVehicle = action.payload.data;
      })
  }
})

export default VehicleSlice