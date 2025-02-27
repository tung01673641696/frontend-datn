import React from 'react'
import './Common.scss'
import Img from '../../../assets/Images/User/user.jpg'
import { Link } from 'react-router-dom'

export default function Common({ children }) {
  const manager = [
    { id: 1, title: 'Trang chủ', path: '/' },
    { id: 2, title: 'Quản lí nhà', path: '/landlord/house-manager' },
    { id: 3, title: 'Quản lí phòng', path: '/landlord/room-manager' },
    { id: 4, title: 'Quản lí khách thuê', path: '/landlord/tenant-manager' },
    { id: 5, title: 'Quản lí phương tiện', path: '/landlord/vehicle-manager' },
    { id: 6, title: 'Quản lí tin đăng phòng', path: '/landlord/house-manager' },
    { id: 7, title: 'Quản lí khách hàng tiềm năng', path: '/landlord/house-manager' },
  ]

  return (
    <div className='common'>
      <div className='common_list'>
        <div className='common_list_user'>
          <div className='common_list_user_img'>
            <img src={Img} />
          </div>

          <div className='common_list_user_info'>
            <span className='common_list_user_info_land'>Chủ nhà</span>
            <span className='common_list_user_info_name'>Hoàng Thanh Tùng</span>
          </div>
        </div>

        <div className='common_list_link'>
          {manager?.map((item) => (
            <Link to={item?.path} className='common_list_link_ele'>{item?.title}</Link>
          ))}
        </div>
      </div>

      <div className='common_content'>
        {children}
      </div>
    </div>
  )
}
