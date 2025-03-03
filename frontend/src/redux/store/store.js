import { configureStore } from "@reduxjs/toolkit";
import addressSlice from "../reducers/address";

export const store = configureStore({
  reducer: {
    addressReducer: addressSlice.reducer,
  }
})