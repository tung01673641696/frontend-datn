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

export const getPostsByOneCustomer = createAsyncThunk("posts/getPostsByOneCustomer", async ({ customerId, status }) => {
  const getPostsOneCustomer = await PostsApi.getPostsByOneCustomer(customerId, status);
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
    thunkApi.dispatch(getPostsByOneCustomer({ customerId: user_id, status: 'pending' }))
  }
  return editPostsByCustomer
})

export const deletePostsByCustomer = createAsyncThunk("posts/deletePostsByCustomer", async (postId, thunkApi) => {
  const deletePostsByCustomer = await PostsApi.deletePostsByCustomer(postId)

  if (deletePostsByCustomer.status === 200) {
    toast.success("Xóa bài đăng thành công");
    const user = JSON.parse(localStorage.getItem("user"))
    const user_id = user.id
    thunkApi.dispatch(getPostsByOneCustomer(user_id))
  } else {
    toast.error("Xóa bài đăng thất bại");
  }
  return deletePostsByCustomer
})

export const getAllPostsByAllCustomer = createAsyncThunk("posts/getAllPostsByAllCustomer", async () => {
  const getAllPostsByAllCustomer = await PostsApi.getAllPostsByAllCustomer();
  return getAllPostsByAllCustomer
})

export const adminApprovePostByCustomer = createAsyncThunk(
  "posts/adminApprovePostByCustomer",
  async (postId) => {
    const res = await PostsApi.adminApprovePostCustomer(postId);
    return res;
  }
);

export const adminRejectPostByCustomer = createAsyncThunk(
  "posts/adminRejectPostByCustomer",
  async (postId) => {
    const res = await PostsApi.adminRejectPostCustomer(postId);
    return res;
  }
);

const PostsSlice = createSlice({
  name: "posts",
  initialState: {
    postsByOneCustomer: [],
    onePostsByCustomer: {},
    allPostsByAllCustomer: []
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
      .addCase(getAllPostsByAllCustomer.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getAllPostsByAllCustomer.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(getAllPostsByAllCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.allPostsByAllCustomer = action.payload.data;
      })
  }
})

export default PostsSlice