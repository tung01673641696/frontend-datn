import React, { Suspense } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

const Register = React.lazy(() => import('./pages/Register/Register'));

const Home = React.lazy(() => import('./pages/Home/Home'))

export default function Routers() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/register' element={<Register />} />

            <Route>
              <Route path='/' element={<Home />} />
            </Route>

          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}
