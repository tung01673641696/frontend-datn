import { configureStore } from "@reduxjs/toolkit";
import addressSlice from "../reducers/address";
import UserSlice from "../reducers/user";
import HouseSlice from "../reducers/house";
import RoomSlice from "../reducers/room";
import TenantSlice from "../reducers/tenant";
import VehicleSlice from "../reducers/vehicle";
import PostsSlice from "../reducers/posts";

export const store = configureStore({
  reducer: {
    addressReducer: addressSlice.reducer,
    userReducer: UserSlice.reducer,
    houseReducer: HouseSlice.reducer,
    roomReducer: RoomSlice.reducer,
    tenantReducer: TenantSlice.reducer,
    vehicleReducer: VehicleSlice.reducer,
    postsReducer: PostsSlice.reducer
  }
})