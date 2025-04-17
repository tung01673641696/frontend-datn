import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import PostsApi from "../../api/PostsApi";
import { toast } from "react-toastify";

export const addPostsByCustomer = createAsyncThunk("posts/addPostsByCustomer", async (data) => {
  const addPostsByCustomer = await PostsApi.addPostsByCustomer(data);
  return addPostsByCustomer
})

export const addPostsByLandlord = createAsyncThunk("posts/addPostsByLandlord", async (data) => {
  const addPostsByLandlord = await PostsApi.addPostsByLandlord(data);
  return addPostsByLandlord
})

export const getPostsByOneCustomer = createAsyncThunk("posts/getPostsByOneCustomer", async (customerId) => {
  const getPostsOneCustomer = await PostsApi.getPostsByOneCustomer(customerId);
  return getPostsOneCustomer
})

export const getOnePostsByCustomer = createAsyncThunk("posts/getOnePostsByCustomer", async (postId) => {
  const getOnePostsByCustomer = await PostsApi.getOnePostsByCustomer(postId);
  return getOnePostsByCustomer
})

export const editPostsByCustomer = createAsyncThunk("posts/editPostsByCustomer", async ({ postId, data }, thunkApi) => {
  const editPostsByCustomer = await PostsApi.editPostsByCustomer(postId, data);
  if (editPostsByCustomer.status === 200) {
    toast.success("Cập nhật bài đăng thành công");
    const user = JSON.parse(localStorage.getItem("user"))
    const user_id = user.id
    thunkApi.dispatch(getPostsByOneCustomer(user_id))
  }
  return editPostsByCustomer
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


const PostsSlice = createSlice({
  name: "posts",
  initialState: {
    postsByOneCustomer: [],
    onePostsByCustomer: {}

    // listRoomByHouse: [],
    // oneRoom: {}
  },
  extraReducers: builder => {
    builder
      .addCase(getPostsByOneCustomer.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getPostsByOneCustomer.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(getPostsByOneCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.postsByOneCustomer = action.payload.data;
      })
      .addCase(getOnePostsByCustomer.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getOnePostsByCustomer.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(getOnePostsByCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.onePostsByCustomer = action.payload.data;
      })
  }
})

export default PostsSlice