import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import PostsApi from "../../api/PostsApi";
import { toast } from "react-toastify";

// export const getRoomByHouse = createAsyncThunk("room/getRoomByHouse", async (id) => {
//   const listRoom = await RoomApi.getRoomByHouse(id);
//   return listRoom
// })

export const addPostsByCustomer = createAsyncThunk("posts/addPostsByCustomer", async (data) => {
  const addPostsByCustomer = await PostsApi.addPostsByCustomer(data);
  return addPostsByCustomer
})

export const addPostsByLandlord = createAsyncThunk("posts/addPostsByLandlord", async (data) => {
  const addPostsByLandlord = await PostsApi.addPostsByLandlord(data);
  return addPostsByLandlord
})

// export const deleteRoom = createAsyncThunk("room/deleteRoom", async ({ roomId, houseId }, thunkApi) => {
//   const deleteRoom = await RoomApi.deleteRoom(roomId)

//   if (deleteRoom.status === 200) {
//     toast.success("Xóa phòng thành công");
//     thunkApi.dispatch(getRoomByHouse(houseId))
//   } else {
//     toast.error("Xóa phòng thất bại");
//   }
//   return deleteRoom
// })

// export const getOneRoom = createAsyncThunk("room/getOneRoom", async (roomId) => {
//   const oneRoom = await RoomApi.getOneRoom(roomId);
//   return oneRoom
// })

// export const editRoom = createAsyncThunk("room/editRoom", async ({ roomId, data }, thunkApi) => {
//   const editRoom = await RoomApi.editRoom(roomId, data);
//   if (editRoom.status === 200) {
//     toast.success("Cập nhật phòng thành công");
//     const { house_id } = data;
//     thunkApi.dispatch(getRoomByHouse(house_id))
//   }
//   return editRoom
// })

const PostsSlice = createSlice({
  name: "posts",
  initialState: {
    // listRoomByHouse: [],
    // oneRoom: {}
  },
  // extraReducers: builder => {
  //   builder
  //     .addCase(getRoomByHouse.pending, (state, action) => {
  //       state.loading = true
  //     })
  //     .addCase(getRoomByHouse.rejected, (state, action) => {
  //       state.loading = false
  //     })
  //     .addCase(getRoomByHouse.fulfilled, (state, action) => {
  //       state.loading = false
  //       state.listRoomByHouse = action.payload.data;
  //     })
  // }
})

export default PostsSlice