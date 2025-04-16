import React, { Suspense } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

const Register = React.lazy(() => import('./pages/Register/Register'));
const Login = React.lazy(() => import('./pages/Login/Login'));

const Home = React.lazy(() => import('./pages/Home/Home'))
const SearchRoom = React.lazy(() => import('./pages/SearchRoom/SearchRoom'))
const SearchNeed = React.lazy(() => import('./pages/SearchNeed/SearchNeed'))
const RoomDetail = React.lazy(() => import('./pages/RoomDetail/RoomDetail'))
const NeedDetail = React.lazy(() => import('./pages/NeedDetail/NeedDetail'))

const InfoLandlord = React.lazy(() => import('./pages/Landlord/InfoLandlord/InfoLandlord'))
const PostLandlord = React.lazy(() => import('./pages/Landlord/PostLandlord/PostLandlord'))
const CustomerManager = React.lazy(() => import('./pages/Landlord/CustomerManager/CustomerManager'))

const Dashboard = React.lazy(() => import('./pages/Landlord/Dashboard/Dashboard'))
const HouseManager = React.lazy(() => import('./pages/Landlord/HouseManager/HouseManager'))
const AddHouse = React.lazy(() => import('./pages/Landlord/HouseManager/AddHouse/AddHouse'))
const EditHouse = React.lazy(() => import('./pages/Landlord/HouseManager/EditHouse/EditHouse'))

const RoomManager = React.lazy(() => import('./pages/Landlord/RoomManager/RoomManager'))
const AddRoom = React.lazy(() => import('./pages/Landlord/RoomManager/AddRoom/AddRoom'))
const EditRoom = React.lazy(() => import('./pages/Landlord/RoomManager/EditRoom/EditRoom'))

const TenantManager = React.lazy(() => import('./pages/Landlord/TenantManager/TenantManager'))
const AddTenant = React.lazy(() => import('./pages/Landlord/TenantManager/AddTenant/AddTenant'))
const EditTenant = React.lazy(() => import('./pages/Landlord/TenantManager/EditTenant/EditTenant'))

const VehicleManager = React.lazy(() => import('./pages/Landlord/VehicleManager/VehicleManager'))
const AddVehicle = React.lazy(() => import('./pages/Landlord/VehicleManager/AddVehicle/AddVehicle'))
const EditVehicle = React.lazy(() => import('./pages/Landlord/VehicleManager/EditVehicle/EditVehicle'))

const InfoTenant = React.lazy(() => import('./pages/Tenant/InfoTenant/InfoTenant'))
const PostTenant = React.lazy(() => import('./pages/Tenant/PostTenant/PostTenant'))
const PostManagerTenant = React.lazy(() => import('./pages/Tenant/PostManager/PostManager'))
const RoomLikeManager = React.lazy(() => import('./pages/Tenant/RoomLikeManager/RoomLikeManager'))

export default function Routers() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />

            <Route>
              <Route path='/' element={<Home />} />
              <Route path='/search-room' element={<SearchRoom />} />
              <Route path='/search-need' element={<SearchNeed />} />
              <Route path='/room-detail' element={<RoomDetail />} />
              <Route path='/need-detail' element={<NeedDetail />} />
            </Route>

            <Route>
              <Route path='/landlord/info-landlord' element={<InfoLandlord />} />
              <Route path='/landlord/post' element={<PostLandlord />} />
              <Route path='/landlord/customer-manager' element={<CustomerManager />} />

              <Route path='/landlord/dashboard' element={<Dashboard />} />
              <Route path='/landlord/house-manager' element={<HouseManager />} />
              <Route path='landlord/house-manager/add-house' element={<AddHouse />} />
              <Route path='landlord/house-manager/edit-house/:id' element={<EditHouse />} />

              <Route path='/landlord/room-manager' element={<RoomManager />} />
              <Route path='/landlord/room-manager/add-room' element={<AddRoom />} />
              <Route path='/landlord/room-manager/edit-room/room_id/:id' element={<EditRoom />} />

              <Route path='/landlord/tenant-manager' element={<TenantManager />} />
              <Route path='/landlord/tenant-manager/add-tenant' element={<AddTenant />} />
              <Route path='/landlord/tenant-manager/edit-tenant/tenant_id/:id' element={<EditTenant />} />

              <Route path='/landlord/vehicle-manager' element={<VehicleManager />} />
              <Route path='/landlord/vehicle-manager/add-vehicle' element={<AddVehicle />} />
              <Route path='/landlord/vehicle-manager/edit-vehicle/vehicle_id/:id' element={<EditVehicle />} />
            </Route>

            <Route>
              <Route path='/tenant/info-tenant' element={<InfoTenant />} />
              <Route path='/tenant/post/user_id/:id' element={<PostTenant />} />
              <Route path='/tenant/post-manager' element={<PostManagerTenant />} />
              <Route path='/tenant/room-like-manager' element={<RoomLikeManager />} />
            </Route>

          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}
