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

export const landlordGetAllPost = createAsyncThunk("posts/landlordGetAllPost", async ({ landlordId, status }) => {
  const getAllPost = await PostsApi.landlordGetAllPost(landlordId, status);
  return getAllPost
})

export const tenantGetAllPost = createAsyncThunk("posts/tenantGetAllPost", async ({ tenantId, status }) => {
  const getAllPost = await PostsApi.tenantGetAllPost(tenantId, status);
  return getAllPost
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
    thunkApi.dispatch(landlordGetAllPost({ customerId: user_id, status: 'pending' }))
  }
  return editPostsByCustomer
})

export const deletePostsByCustomer = createAsyncThunk("posts/deletePostsByCustomer", async (postId, thunkApi) => {
  const deletePostsByCustomer = await PostsApi.deletePostsByCustomer(postId)

  if (deletePostsByCustomer.status === 200) {
    toast.success("Xóa bài đăng thành công");
    const user = JSON.parse(localStorage.getItem("user"))
    const user_id = user.id
    thunkApi.dispatch(tenantGetAllPost(user_id))
    thunkApi.dispatch(landlordGetAllPost(user_id))
  } else {
    toast.error("Xóa bài đăng thất bại");
  }
  return deletePostsByCustomer
})

export const getAllPostsByAllCustomer = createAsyncThunk("posts/getAllPostsByAllCustomer", async () => {
  const getAllPostsByAllCustomer = await PostsApi.getAllPostsByAllCustomer();
  return getAllPostsByAllCustomer
})

export const adminApprovePost = createAsyncThunk(
  "posts/adminApprovePost",
  async (postId) => {
    const res = await PostsApi.adminApprovePost(postId);
    return res;
  }
);

export const adminRejectPost = createAsyncThunk(
  "posts/adminRejectPost",
  async (postId) => {
    const res = await PostsApi.adminRejectPost(postId);
    return res;
  }
);

export const getAllPostsByAllCustomerActive = createAsyncThunk("posts/getAllPostsByAllCustomerAtive", async () => {
  const getAllPostsByAllCustomerActive = await PostsApi.getAllPostsByAllCustomerActive();
  return getAllPostsByAllCustomerActive
})

export const getAllPostsByAllLandlordActive = createAsyncThunk("posts/getAllPostsByAllLandlordAtive", async () => {
  const getAllPostsByAllLandlordActive = await PostsApi.getAllPostsByAllLandlordActive();
  return getAllPostsByAllLandlordActive
})

export const getAllPostsByAllLandlord = createAsyncThunk("posts/getAllPostsByAllLandlord", async () => {
  const getAllPostsByAllLandlord = await PostsApi.getAllPostsByAllLandlord();
  return getAllPostsByAllLandlord
})

export const getAllPostByLandlordActiveByDistrict = createAsyncThunk("posts/getAllPostByLandlordActiveByDistrict", async (districtId) => {
  const getAllPostByLandlordActiveByDistrict = await PostsApi.getAllPostsByAllLandlordActiveByDistrict(districtId);
  return getAllPostByLandlordActiveByDistrict
})

const PostsSlice = createSlice({
  name: "posts",
  initialState: {
    postsByOneLandlord: [],
    postsByOneTenant: [],
    onePostsByCustomer: {},
    allPostsByAllCustomer: [],
    allPostsByAllCustomerActive: [],
    allPostsByAllLandlordActive: [],
    allPostsByAllLandlord: [],
    allPostsByLandlordActiveByDistrict: [],
    postByRoomId: {}
  },
  extraReducers: builder => {
    builder
      .addCase(landlordGetAllPost.fulfilled, (state, action) => {
        state.loading = false
        state.postsByOneLandlord = action.payload.data;
      })
      .addCase(tenantGetAllPost.fulfilled, (state, action) => {
        state.loading = false
        state.postsByOneTenant = action.payload.data;
      })
      .addCase(getOnePostsByCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.onePostsByCustomer = action.payload.data;
      })
      .addCase(getAllPostsByAllCustomer.fulfilled, (state, action) => {
        state.loading = false
        state.allPostsByAllCustomer = action.payload.data;
      })
      .addCase(getAllPostsByAllCustomerActive.fulfilled, (state, action) => {
        state.loading = false
        state.allPostsByAllCustomerActive = action.payload.data;
      })
      .addCase(getAllPostsByAllLandlord.fulfilled, (state, action) => {
        state.loading = false
        state.allPostsByAllLandlord = action.payload.data;
      })
      .addCase(getAllPostsByAllLandlordActive.fulfilled, (state, action) => {
        state.loading = false
        state.allPostsByAllLandlordActive = action.payload.data;
      })
      .addCase(getAllPostByLandlordActiveByDistrict.fulfilled, (state, action) => {
        state.loading = false
        state.allPostsByLandlordActiveByDistrict = action.payload.data;
      })
  }
})

export default PostsSlice