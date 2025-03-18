import React from 'react'
import './Common.scss'
import Img from '../../../assets/Images/User/user.jpg'
import { Link } from 'react-router-dom'

export default function Common({ children }) {
  const user = JSON.parse(localStorage.getItem("user"))
  const id = user.id


  const manager = [
    { id: 1, title: 'Trang chủ', path: '/' },
    { id: 2, title: 'Thống kê', path: '/landlord/dashboard' },
    { id: 3, title: 'Quản lý nhà', path: `/landlord/house-manager/user/${id}` },
    { id: 4, title: 'Quản lý phòng', path: '/landlord/room-manager' },
    { id: 5, title: 'Quản lý khách thuê', path: '/landlord/tenant-manager' },
    { id: 6, title: 'Quản lý phương tiện', path: '/landlord/vehicle-manager' },
    { id: 7, title: 'Quản lý bài đăng', path: '/landlord/house-manager' },
    { id: 8, title: 'Quản lý khách hàng tiềm năng', path: '/landlord/house-manager' },
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
            <span className='common_list_user_info_name'>{user?.name}</span>
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
