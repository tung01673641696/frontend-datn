import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import TenantApi from "../../api/TenantApi";
import { toast } from "react-toastify";


export const addTenant = createAsyncThunk("tenant/addTenant", async (data) => {
  const addTenant = await TenantApi.addTenant(data);
  return addTenant
})

export const getAllTenant = createAsyncThunk("tenant/getAllTenant", async (status = "active") => {
  const getAllTenant = await TenantApi.getAllTenant(status);
  return getAllTenant
})

export const deleteTenant = createAsyncThunk("tenant/deleteTenant", async (tenantId, thunkApi) => {
  const deleteTenant = await TenantApi.deleteTenant(tenantId)

  if (deleteTenant.status === 200) {
    toast.success("Xóa khách thuê thành công");
    const state = thunkApi.getState();
    const currentStatus = state.tenantReducer.currentStatus || "active";
    thunkApi.dispatch(getAllTenant(currentStatus));
  } else {
    toast.error("Xóa khách thuê thất bại");
  }
  return deleteTenant
})

export const getOneTenant = createAsyncThunk("tenant/getOneTenant", async (tenantId) => {
  const getOneTenant = await TenantApi.getOneTenant(tenantId);
  return getOneTenant
})

export const editTenant = createAsyncThunk("tenant/editTenant", async ({ tenantId, data }, thunkApi) => {
  const editTenant = await TenantApi.editTenant(tenantId, data);
  if (editTenant.status === 200) {
    toast.success("Cập nhật thông tin khách thuê thành công");
    const currentStatus = thunkApi.getState().tenantReducer.currentStatus || "active";
    thunkApi.dispatch(getAllTenant(currentStatus));
  }
  return editTenant
})

export const getTenantByRoom = createAsyncThunk("tenant/getTenantByRoom", async (roomId) => {
  const getTenantByRoom = await TenantApi.getTenantByRoom(roomId);
  return getTenantByRoom
})

export const getDetailTenantByRoom = createAsyncThunk("tenant/getDetailTenantByRoom", async (roomId) => {
  const getDetailTenantByRoom = await TenantApi.getDetailTenantByRoom(roomId);
  return getDetailTenantByRoom
})

const TenantSlice = createSlice({
  name: "tenant",
  initialState: {
    allTenant: [],
    oneTenant: {},
    listTenantByRoom: [],
    detailTenantByRoom: {},
    currentStatus: "active",
  },
  extraReducers: builder => {
    builder
      .addCase(getAllTenant.fulfilled, (state, action) => {
        state.loading = false
        state.allTenant = action.payload.data;
        state.currentStatus = action.meta.arg;
      })
      .addCase(getOneTenant.fulfilled, (state, action) => {
        state.loading = false
        state.oneTenant = action.payload.data;
      })
      .addCase(getTenantByRoom.fulfilled, (state, action) => {
        state.loading = false
        state.listTenantByRoom = action.payload.data;
      })
      .addCase(getDetailTenantByRoom.fulfilled, (state, action) => {
        state.loading = false
        state.detailTenantByRoom = action.payload.data;
      })
  }
})

export default TenantSlice