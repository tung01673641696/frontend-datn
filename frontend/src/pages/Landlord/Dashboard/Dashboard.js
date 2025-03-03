import React from 'react'
import "./Dashboard.scss"
import Common from '../../../layouts/LandlordLayout/Common/Common'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const statis = [
    {
      id: 1,
      title: 'Số nhà',
      number: 6,
      path: '/landlord/house-manager',
      color: 'orange'
    },
    {
      id: 2,
      title: 'Số phòng',
      number: 40,
      path: '/landlord/room-manager',
      color: 'yellow'
    },
    {
      id: 3,
      title: 'Số khách thuê',
      number: 100,
      path: '/landlord/tenant-manager',
      color: 'green'
    },
    {
      id: 4,
      title: 'Số phương tiện',
      number: 80,
      path: '/landlord/vehicle-manager',
      color: 'purple'
    },
    {
      id: 5,
      title: 'Số bài đăng',
      number: 20,
      path: '/landlord/house-manager',
      color: 'blue'
    },
    {
      id: 6,
      title: 'Số khách hàng tiềm năng',
      number: 30,
      path: '/landlord/dashboard',
      color: 'taro'
    }
  ]

  return (
    <Common>
      <h3>Thống kê</h3>

      <div className='quantity'>
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
