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
    { id: 3, title: 'Quản lý nhà', path: `/landlord/house-manager` },
    { id: 4, title: 'Quản lý khách thuê', path: '/landlord/tenant-manager' },
    {
      id: 5,
      title: 'Quản lý hợp đồng',
      children: [
        { id: 6, title: 'Quản lý hợp đồng cọc', path: '/landlord/deposit-contract-manager-by-landlord' },
        { id: 7, title: 'Quản lý hợp đồng thuê', path: '/landlord/contract-manager-by-landlord' },
      ]
    },
    { id: 8, title: 'Hóa đơn dịch vụ', path: '/landlord/service-bill-manager' }
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
            item.path ? (
              <Link
                key={item.id}
                to={item.path}
                className='common_list_link_ele'
              >
                {item.title}
              </Link>
            ) : (
              <div key={item.id} className='common_list_link_ele has_submenu'>
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

      <div className='common_content'>
        {children}
      </div>
    </div >
  )
}
