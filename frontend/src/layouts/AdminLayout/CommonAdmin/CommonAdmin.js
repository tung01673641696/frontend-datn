import React from 'react'
import './CommonAdmin.scss'
import Img from '../../../assets/Images/User/user.jpg'
import { Link } from 'react-router-dom'

export default function CommonAdmin({ children }) {

  const manager = [
    { id: 1, title: 'Thống kê', path: '' },
    { id: 2, title: 'Quản lý Users', path: '' },
    { id: 3, title: 'Quản lý Bài đăng', path: '' },
  ]

  return (
    <div className='common_admin'>
      <div className='common_admin_list'>
        <div className='common_admin_list_user'>
          <div className='common_admin_list_user_img'>
            <img src={Img} />
          </div>

          <div className='common_admin_list_user_info'>
            <span className='common_admin_list_user_info_land'>Admin</span>
            <span className='common_admin_list_user_info_name'>Hoàng Thanh Tùng</span>
          </div>
        </div>

        <div className='common_admin_list_link'>
          {manager?.map((item) => (
            <Link to={item?.path} className='common_admin_list_link_ele'>{item?.title}</Link>
          ))}
        </div>
      </div>

      <div className='common_admin_content'>
        {children}
      </div>
    </div>
  )
}
