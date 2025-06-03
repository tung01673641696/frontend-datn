import React, { useState } from 'react'
import "./DropdownLandlord.scss"
import { Link, useNavigate } from 'react-router-dom'
import BaseModal from '../../../components/BaseModal/BaseModal'

export default function DropdownLandlord() {
  const [isShow, setIsShow] = useState(false)
  const navigate = useNavigate()
  const user = localStorage.getItem('user') === null ? null : JSON.parse(localStorage.getItem('user'));

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
    { id: 2, title: 'Quản lý chung', path: '/landlord/dashboard' },
    { id: 3, title: 'Quản lý bài đăng', path: '/landlord/post-manager' },
    { id: 4, title: 'Khách hàng giữ phòng', path: '/landlord/reserve-manager' },
  ]

  function handleClick() {
    navigate('/landlord/post')
  }


  return (
    <div className='header_user'>
      <div className='header_user_write' onClick={handleClick}>
        <i class="bi bi-pencil-square"></i>
        <span>
          Đăng phòng
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
          <span>{user?.name}</span>
        </span>

        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          {manager?.map((item) => (
            <Link to={item?.path} className='dropdown-menu_item'>{item?.title}</Link>
          ))}
          <li className='dropdown-menu_item' onClick={() => handleShow()}>Đăng xuất</li>
        </ul>
      </div>
    </div>
  )
}
