import React from 'react'
import "./AdminDashboard.scss"
import CommonAdmin from '../../../layouts/AdminLayout/CommonAdmin/CommonAdmin'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  const statis = [
    {
      id: 1,
      title: 'Số user',
      number: 30,
      path: '/landlord/dashboard',
      color: 'taro'
    },
    {
      id: 2,
      title: 'Số chủ nhà',
      number: 6,
      path: '/landlord/house-manager',
      color: 'orange'
    },
    {
      id: 3,
      title: 'Số khách thuê',
      number: 40,
      path: '/landlord/room-manager',
      color: 'yellow'
    },
    {
      id: 4,
      title: 'Số nhà',
      number: 100,
      path: '/landlord/tenant-manager',
      color: 'green'
    },
    {
      id: 5,
      title: 'Số phòng',
      number: 80,
      path: '/landlord/vehicle-manager',
      color: 'purple'
    },
    {
      id: 6,
      title: 'Số bài đăng',
      number: 20,
      path: '/landlord/house-manager',
      color: 'blue'
    },
  ]

  return (
    <CommonAdmin>
      <h3 className='dashboard_title'>Thống kê của Admin</h3>

      <div className='dashboard_quantity'>
        {
          statis?.map((item) => (
            <Link className={`quantity_ele orange ${item.color}`} to={item?.path}>
              <span className='quantity_ele_title'>{item.title}</span>
              <span className='quantity_ele_number'>{item.number}</span>
            </Link>
          ))
        }
      </div>

    </CommonAdmin>
  )
}
