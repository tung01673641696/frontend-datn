import React, { useState } from 'react'
import "./DropdownTenant.scss"
import { Link, useNavigate } from 'react-router-dom'
import BaseModal from '../../../components/BaseModal/BaseModal'

export default function DropdownTenant() {
  const [isShow, setIsShow] = useState(false)
  const navigate = useNavigate()
  const user = localStorage.getItem('user') === null ? null : JSON.parse(localStorage.getItem('user'));
  const user_id = user.id

  function handleShow() {
    setIsShow(true)
  }

  function handleClose() {
    setIsShow(false)
  }

  function handleLogout() {
    localStorage.removeItem('user')
    localStorage.removeItem("access_token")
    navigate('/login')
  }

  const manager = [
    { id: 1, title: 'Thông tin cá nhân', path: '/info-user' },
    { id: 2, title: 'Quản lý bài đăng', path: '/tenant/post-manager' },
    {
      id: 3, title: 'Xem hợp đồng',
      children: [
        { id: 8, title: 'Xem hợp đồng cọc', path: '/tenant/deposit-contract-manager' },
        { id: 9, title: 'Xem hợp đồng thuê', path: '/tenant/contract-manager' },
      ]
    },
    // { id: 8, title: 'Hợp đồng cọc', path: '/tenant/deposit-contract-manager' },
    // { id: 9, title: 'Hợp đồng thuê phòng', path: '/tenant/contract-manager' },
    { id: 10, title: 'Xem hóa đơn dịch vụ', path: '/tenant/bill-manager' },
  ]

  function handleClick() {
    navigate(`/tenant/post/user_id/${user_id}`)
  }

  return (
    <div className='header_user'>
      <div className='header_user_write' onClick={handleClick}>
        <i class="bi bi-pencil-square"></i>
        <span>
          Đăng tin tìm phòng
        </span>
      </div>

      <>
        <BaseModal
          open={isShow}
          title="Đăng xuất"
          type="red"
          content="Bạn có chắc chắn muốn đăng xuất ?"
          onCancel={handleClose}
          onConfirm={handleLogout}
        />
      </>

      <div class="dropdown">
        <span className=" dropdown-toggle">
          <i className="bi bi-person-circle"></i>
          <span>{user?.name} (người thuê)</span>
        </span>

        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          {manager.map((item) => (
            item.children ? (
              <li className='dropdown-menu_item has-submenu' key={item.id}>
                {item.title}
                <ul className='submenu'>
                  {item.children.map((child) => (
                    <Link to={child.path} key={child.id} className='submenu-item'>{child.title}</Link>
                  ))}
                </ul>
              </li>
            ) : (
              <Link to={item.path} key={item.id} className='dropdown-menu_item'>{item.title}</Link>
            )
          ))}
          <li className='dropdown-menu_item' onClick={() => handleShow()}>Đăng xuất</li>
        </ul>
      </div>
    </div>
  )
}
