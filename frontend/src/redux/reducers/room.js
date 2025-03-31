import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import RoomApi from "../../api/RoomApi";

export const getRoomByHouse = createAsyncThunk("room/getRoomByHouse", async (id) => {
  const listRoom = await RoomApi.getRoomByHouse(id);
  return listRoom
})

const RoomSlice = createSlice({
  name: "room",
  initialState: {
    listRoomByHouse: [],
  },
  extraReducers: builder => {
    builder
      .addCase(getRoomByHouse.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getRoomByHouse.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(getRoomByHouse.fulfilled, (state, action) => {
        state.loading = false
        state.listRoomByHouse = action.payload.data;
      })
  }
})

export default RoomSlice