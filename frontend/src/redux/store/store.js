import { configureStore } from "@reduxjs/toolkit";
import addressSlice from "../reducers/address";
import UserSlice from "../reducers/user";
import HouseSlice from "../reducers/house";
import RoomSlice from "../reducers/room";
import TenantSlice from "../reducers/tenant";
import PostsSlice from "../reducers/posts";
import RentalRequestSlice from "../reducers/rentalRequest";
import ContractSlice from "../reducers/contract";
import BillSlice from "../reducers/bill";

export const store = configureStore({
  reducer: {
    addressReducer: addressSlice.reducer,
    userReducer: UserSlice.reducer,
    houseReducer: HouseSlice.reducer,
    roomReducer: RoomSlice.reducer,
    tenantReducer: TenantSlice.reducer,
    postsReducer: PostsSlice.reducer,
    rentalrequestReducer: RentalRequestSlice.reducer,
    contractReducer: ContractSlice.reducer,
    billReducer: BillSlice.reducer
  }
})