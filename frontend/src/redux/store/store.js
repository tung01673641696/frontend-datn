import { configureStore } from "@reduxjs/toolkit";
import addressSlice from "../reducers/address";
import UserSlice from "../reducers/user";
import HouseSlice from "../reducers/house";
import RoomSlice from "../reducers/room";
import TenantSlice from "../reducers/tenant";
import VehicleSlice from "../reducers/vehicle";
import PostsSlice from "../reducers/posts";
import categorySlice from "../reducers/category";
import RentalRequestSlice from "../reducers/rentalRequest";
import ContractSlice from "../reducers/contract";

export const store = configureStore({
  reducer: {
    addressReducer: addressSlice.reducer,
    userReducer: UserSlice.reducer,
    houseReducer: HouseSlice.reducer,
    roomReducer: RoomSlice.reducer,
    tenantReducer: TenantSlice.reducer,
    vehicleReducer: VehicleSlice.reducer,
    postsReducer: PostsSlice.reducer,
    categoryReducer: categorySlice.reducer,
    rentalrequestReducer: RentalRequestSlice.reducer,
    contractReducer: ContractSlice.reducer
  }
})