import { configureStore } from "@reduxjs/toolkit";
import addressSlice from "../reducers/address";
import UserSlice from "../reducers/user";
import HouseSlice from "../reducers/house";

export const store = configureStore({
  reducer: {
    addressReducer: addressSlice.reducer,
    userReducer: UserSlice.reducer,
    houseReducer: HouseSlice.reducer
  }
})