import React, { Suspense } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

const Register = React.lazy(() => import('./pages/Register/Register'));
const Login = React.lazy(() => import('./pages/Login/Login'));

const Home = React.lazy(() => import('./pages/Home/Home'))
const SearchRoom = React.lazy(() => import('./pages/SearchRoom/SearchRoom'))
const SearchNeed = React.lazy(() => import('./pages/SearchNeed/SearchNeed'))
const RoomDetail = React.lazy(() => import('./pages/RoomDetail/RoomDetail'))
const NeedDetail = React.lazy(() => import('./pages/NeedDetail/NeedDetail'))
const InfoUser = React.lazy(() => import('./pages/InfoUser/InfoUser'))

const PostLandlord = React.lazy(() => import('./pages/Landlord/PostLandlord/PostLandlord'))
const RentalRequestManager = React.lazy(() => import('./pages/Landlord/RentalRequestManager/RentalRequestManager'))
const PostManagerLandlord = React.lazy(() => import('./pages/Landlord/PostManager/PostManager'))

const Dashboard = React.lazy(() => import('./pages/Landlord/Dashboard/Dashboard'))
const HouseManager = React.lazy(() => import('./pages/Landlord/HouseManager/HouseManager'))
const AddHouse = React.lazy(() => import('./pages/Landlord/HouseManager/AddHouse/AddHouse'))
const EditHouse = React.lazy(() => import('./pages/Landlord/HouseManager/EditHouse/EditHouse'))

const RoomManager = React.lazy(() => import('./pages/Landlord/RoomManager/RoomManager'))
const ViewRoom = React.lazy(() => import('./pages/Landlord/RoomManager/ViewRoom/ViewRoom'))
const AddRoom = React.lazy(() => import('./pages/Landlord/RoomManager/AddRoom/AddRoom'))
const EditRoom = React.lazy(() => import('./pages/Landlord/RoomManager/EditRoom/EditRoom'))

const CreateContract = React.lazy(() => import('./pages/Landlord/RentalRequestManager/CreateContract/CreateContract'))
const ContractManagerByLandlord = React.lazy(() => import('./pages/Landlord/ContractManager/ContractManager'))

const TenantManager = React.lazy(() => import('./pages/Landlord/TenantManager/TenantManager'))
const EditTenant = React.lazy(() => import('./pages/Landlord/TenantManager/EditTenant/EditTenant'))

const PostByTenant = React.lazy(() => import('./pages/Tenant/PostByTenant/PostByTenant'))
const EditPostByTenant = React.lazy(() => import('./pages/Tenant/PostManager/EditPostByTenant/EditPostByTenant'))
const PostManagerTenant = React.lazy(() => import('./pages/Tenant/PostManager/PostManager'))

const DepositContractManager = React.lazy(() => import('./pages/Tenant/DepositContractManager/DepositContractManager'))
const DetailDepositContract = React.lazy(() => import('./pages/Tenant/DetailDepositContract/DetailDepositContract'))
const DetailRentalContract = React.lazy(() => import('./pages/Tenant/DetailRentalContract/DetailRentalContract'))

const ContractManagerByRenter = React.lazy(() => import('./pages/Tenant/ContractManager/ContractManager'))

const ServiceBillManager = React.lazy(() => import('./pages/Landlord/ServiceBillManager/ServiceBillManager'))

const AdminDashboard = React.lazy(() => import('./pages/Admin/AdminDashboard/AdminDashboard'))
const AdminManagerUser = React.lazy(() => import('./pages/Admin/AdminManagerUser/AdminManagerUser'))
const AdminManagerPostsCustomer = React.lazy(() => import('./pages/Admin/AdminManagerPostsCustomer/AdminManagerPostsCustomer'))
const AdminManagerPostsLandlord = React.lazy(() => import('./pages/Admin/AdminManagerPostsLandlord/AdminManagerPostsLandlord'))

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
              <Route path='/search-room/district_id/:district_id' element={<SearchRoom />} />
              <Route path='/search-need' element={<SearchNeed />} />
              <Route path='/room-detail/room_id/:id' element={<RoomDetail />} />
              <Route path='/need-detail/:post_id' element={<NeedDetail />} />
              <Route path='/info-user' element={<InfoUser />} />
            </Route>

            <Route>
              <Route path='/landlord/post' element={<PostLandlord />} />
              <Route path='/landlord/post-manager' element={<PostManagerLandlord />} />

              <Route path='/landlord/dashboard' element={<Dashboard />} />
              <Route path='/landlord/house-manager' element={<HouseManager />} />
              <Route path='landlord/house-manager/add-house' element={<AddHouse />} />
              <Route path='landlord/house-manager/edit-house/:id' element={<EditHouse />} />

              <Route path='/landlord/room-manager/house_id/:houseId' element={<RoomManager />} />
              <Route path='/landlord/room-manager/view-room/room_id/:id' element={<ViewRoom />} />
              <Route path='/landlord/room-manager/add-room/house_id/:houseId' element={<AddRoom />} />
              <Route path='/landlord/room-manager/edit-room/room_id/:id' element={<EditRoom />} />

              <Route path='/landlord/create-contract/renter_id/:renterId?/room_id/:roomId' element={<CreateContract />} />
              <Route path='/landlord/contract-manager-by-landlord' element={<ContractManagerByLandlord />} />


              <Route path='/landlord/tenant-manager' element={<TenantManager />} />
              <Route path='/landlord/tenant-manager/edit-tenant/tenant_id/:id' element={<EditTenant />} />

              <Route path='/landlord/rental-request-manager' element={<RentalRequestManager />} />

              <Route path='landlord/service-bill-manager' element={<ServiceBillManager />} />
            </Route>

            <Route>
              <Route path='/tenant/post/user_id/:id' element={<PostByTenant />} />
              <Route path='/tenant/edit-post/post_id/:id' element={<EditPostByTenant />} />
              <Route path='/tenant/post-manager' element={<PostManagerTenant />} />

              <Route path='/tenant/deposit-contract-manager' element={<DepositContractManager />} />
              <Route path='/tenant/deposit-contract-detail/renter/:renterId/room/:roomId' element={<DetailDepositContract />} />

              <Route path='/tenant/contract-manager' element={<ContractManagerByRenter />} />
              <Route path='/tenant/detail-rental-contract/room_id/:roomId' element={<DetailRentalContract />} />

            </Route>

            <Route>
              <Route path='/admin/dashboard' element={<AdminDashboard />} />
              <Route path='/admin/manager-user' element={<AdminManagerUser />} />
              <Route path='/admin/manager-posts-customer' element={<AdminManagerPostsCustomer />} />
              <Route path='/admin/manager-posts-landlord' element={<AdminManagerPostsLandlord />} />
            </Route>

          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}
