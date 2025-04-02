import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import RoomApi from "../../api/RoomApi";
import { toast } from "react-toastify";

export const getRoomByHouse = createAsyncThunk("room/getRoomByHouse", async (id) => {
  const listRoom = await RoomApi.getRoomByHouse(id);
  return listRoom
})

export const addRoom = createAsyncThunk("room/addRoom", async (data) => {
  const addRoom = await RoomApi.addRoom(data);
  return addRoom
})

export const deleteRoom = createAsyncThunk("room/deleteRoom", async ({ roomId, houseId}, thunkApi) => {
  const deleteRoom = await RoomApi.deleteRoom(roomId)

  if (deleteRoom.status === 200) {
    toast.success("Xóa nhà thành công");
    thunkApi.dispatch(getRoomByHouse(houseId))
  } else {
    toast.error("Xóa nhà thất bại");
  }
  return deleteRoom
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