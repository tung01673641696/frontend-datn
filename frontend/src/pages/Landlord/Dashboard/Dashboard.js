import React from 'react'
import "./Dashboard.scss"
import Common from '../../../layouts/LandlordLayout/Common/Common'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const statis = [
    {
      id: 1,
      title: 'Số nhà',
      number: 3,
      path: '/landlord/house-manager',
      color: 'orange'
    },
    {
      id: 2,
      title: 'Số phòng',
      number: 6,
      path: '/landlord/house-manager',
      color: 'blue'
    },
    {
      id: 3,
      title: 'Số khách thuê',
      number: 8,
      path: '/landlord/tenant-manager',
      color: 'green'
    },
    {
      id: 5,
      title: 'Số bài đăng',
      number: 6,
      path: '/landlord/house-manager',
      color: 'taro'
    }
  ]

  return (
    <Common>
      <h3 className='dashboard_title'>Thống kê</h3>

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

    </Common>
  )
}
