import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import TenantApi from "../../api/TenantApi";
import { toast } from "react-toastify";

// export const addRoom = createAsyncThunk("room/addRoom", async (data) => {
//   const addRoom = await RoomApi.addRoom(data);
//   return addRoom
// })
export const addTenant = createAsyncThunk("tenant/addTenant", async (data) => {
  const addTenant = await TenantApi.addTenant(data);
  return addTenant
})

export const getAllTenant = createAsyncThunk("tenant/getAllTenant", async () => {
  const getAllTenant = await TenantApi.getAllTenant();
  return getAllTenant
})

export const deleteTenant = createAsyncThunk("tenant/deleteTenant", async (tenantId, thunkApi) => {
  const deleteTenant = await TenantApi.deleteTenant(tenantId)

  if (deleteTenant.status === 200) {
    toast.success("Xóa khách thuê thành công");
    thunkApi.dispatch(getAllTenant())
  } else {
    toast.error("Xóa khách thuê thất bại");
  }
  return deleteTenant
})


const TenantSlice = createSlice({
  name: "tenant",
  initialState: {
    allTenant: []
  },
  extraReducers: builder => {
    builder
      .addCase(getAllTenant.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getAllTenant.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(getAllTenant.fulfilled, (state, action) => {
        state.loading = false
        state.allTenant = action.payload.data;
      })
  }
})

export default TenantSlice