import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import TenantApi from "../../api/TenantApi";

// export const addRoom = createAsyncThunk("room/addRoom", async (data) => {
//   const addRoom = await RoomApi.addRoom(data);
//   return addRoom
// })
export const addTenant = createAsyncThunk("tenant/addTenant", async (data) => {
  const addTenant = await TenantApi.addTenant(data);
  return addTenant
})


const TenantSlice = createSlice({
  name: "tenant",
  initialState: {

  },
  extraReducers: builder => {

  }
})

export default TenantSlice