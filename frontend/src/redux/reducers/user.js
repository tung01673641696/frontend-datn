import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import UserApi from "../../api/UserApi";

export const register = createAsyncThunk(
  'user/register',
  async (data) => {
    const resu = await UserApi.register(data);
    return resu
  }
)

export const login = createAsyncThunk(
  "user/login",
  async (data) => {
    const result = await UserApi.login(data);
    if (result.status === 200) {
      return result
    }
  }
)

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      auth: false,
      data: ""
    },
    loading: false,
    error: ""
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
        state.user = action.payload.data;
      })
      .addCase(register.pending, (state, action) => {
        state.loading = true
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user.auth = true;
        state.user = action.payload.data;
      })
  }
})

export default UserSlice