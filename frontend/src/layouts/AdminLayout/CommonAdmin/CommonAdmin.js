import React from 'react'
import './CommonAdmin.scss'
import Img from '../../../assets/Images/User/user.jpg'
import { Link } from 'react-router-dom'

export default function CommonAdmin({ children }) {
  const manager = [
    { id: 1, title: 'Thống kê', path: '/admin/dashboard' },
    { id: 2, title: 'Quản lý Người dùng', path: '/admin/manager-user' },
    {
      id: 3, title: 'Quản lý bài đăng',
      children: [
        { id: 4, title: 'Bài đăng của chủ nhà', path: '/admin/manager-posts-landlord' },
        { id: 5, title: 'Bài đăng của người thuê', path: '/admin/manager-posts-customer' },
      ]
    }
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
            item.path ? (
              <Link
                key={item.id}
                to={item.path}
                className='common_admin_list_link_ele'
              >
                {item.title}
              </Link>
            ) : (
              <div key={item.id} className='common_admin_list_link_ele has_submenu'>
                <span className="main_menu_title">{item.title}</span>
                {item.children && (
                  <div className='submenu'>
                    {item.children.map((child) => (
                      <Link key={child.id} to={child.path} className='submenu_item'>
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      </div>

      <div className='common_admin_content'>
        {children}
      </div>
    </div>
  )
}
