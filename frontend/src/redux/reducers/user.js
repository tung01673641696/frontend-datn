import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import UserApi from "../../api/UserApi";
import { toast } from "react-toastify";

export const register = createAsyncThunk(
  'user/register',
  async (data) => {
    const resu = await UserApi.register(data);
    return resu.data
  }
)

export const login = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const result = await UserApi.login(data);
      if (result.status === 200) {
        return result;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const getAllUser = createAsyncThunk(
  "user/getAllUser",
  async () => {
    const getAllUser = await UserApi.getAllUser();
    return getAllUser
  }
)

export const deleteUser = createAsyncThunk("user/deleteUser", async (userId, thunkApi) => {
  const deleteUser = await UserApi.deleteUser(userId)

  if (deleteUser.status === 200) {
    toast.success("Xóa người dùng thành công");
    thunkApi.dispatch(getAllUser())
  } else {
    toast.error("Xóa người dùng thất bại");
  }
  return deleteUser
})

export const restoreUser = createAsyncThunk("user/restoreUser", async (userId) => {
  const restoreUser = await UserApi.restoreUser(userId)
  return restoreUser
})

export const getDetailUser = createAsyncThunk("user/getDetailUser", async (userId) => {
  const detailUser = await UserApi.getDetailUser(userId);
  return detailUser
})

const access_token = localStorage.getItem('access_token')
const user = JSON.parse(localStorage.getItem("user"))

const UserSlice = createSlice({
  name: "user",
  initialState: {
    isAuth: access_token === 'undefined' || access_token === null ? false : true,
    myInfo: user || {},
    loading: false,
    allUser: [],
    detailUser: {}
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.myInfo = action.payload.data;
      })
      .addCase(register.pending, (state, action) => {
        state.loading = true
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.myInfo = action.payload;
      })

      .addCase(getAllUser.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.loading = false
        state.allUser = action.payload.data;
      })
      .addCase(getDetailUser.fulfilled, (state, action) => {
        state.loading = false
        state.detailUser = action.payload.data;
      })
  }
})

export default UserSlice