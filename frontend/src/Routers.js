import React, { Suspense } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

const Register = React.lazy(() => import('./pages/Register/Register'));
const Login = React.lazy(() => import('./pages/Login/Login'));

const Home = React.lazy(() => import('./pages/Home/Home'))
const SearchRoom = React.lazy(() => import('./pages/SearchRoom/SearchRoom'))
const SearchNeed = React.lazy(() => import('./pages/SearchNeed/SearchNeed'))
const RoomDetail = React.lazy(() => import('./pages/RoomDetail/RoomDetail'))
const NeedDetail = React.lazy(() => import('./pages/NeedDetail/NeedDetail'))

const Dashboard = React.lazy(() => import('./pages/Landlord/Dashboard/Dashboard'))
const HouseManager = React.lazy(() => import('./pages/Landlord/HouseManager/HouseManager'))
const RoomManager = React.lazy(() => import('./pages/Landlord/RoomManager/RoomManager'))
const TenantManager = React.lazy(() => import('./pages/Landlord/TenantManager/TenantManager'))
const VehicleManager = React.lazy(() => import('./pages/Landlord/VehicleManager/VehicleManager'))

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
              <Route path='/landlord/dashboard' element={<Dashboard />} />
              <Route path='/landlord/house-manager/:id' element={<HouseManager />} />
              <Route path='/landlord/room-manager' element={<RoomManager />} />
              <Route path='/landlord/tenant-manager' element={<TenantManager />} />
              <Route path='/landlord/vehicle-manager' element={<VehicleManager />} />
            </Route>

          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}
