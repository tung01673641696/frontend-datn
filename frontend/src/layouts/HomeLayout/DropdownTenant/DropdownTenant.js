import React from 'react'
import "./DropdownTenant.scss"
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export default function DropdownTenant() {
  const navigate = useNavigate()
  const user = localStorage.getItem('user') === null ? null : JSON.parse(localStorage.getItem('user'));
  function handleClick() {
    navigate('/tenant/post')
  }

  const manager = [
    { id: 1, title: 'Thông tin cá nhân', path: '/tenant/info-tenant' },
    { id: 2, title: 'Đăng bài tìm phòng', path: '/tenant/post' },
    { id: 3, title: 'Quản lý bài đăng', path: '/tenant/post-manager' },
    { id: 4, title: 'Quản lý phòng yêu thích', path: '/tenant/room-like-manager' },
    { id: 5, title: 'Quản lý giỏ hàng', path: '' },
    { id: 6, title: 'Quản lý đơn hàng đã đặt', path: '' },
    { id: 7, title: 'Đăng xuất', path: '' },
  ]

  return (
    <div className='header_user'>
      <div className='header_user_write' onClick={handleClick}>
        <i class="bi bi-pencil-square"></i>
        <span>
          Đăng bài
        </span>
      </div>

      <div class="dropdown">
        <span className=" dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
          <i className="bi bi-person-circle"></i>
          <span>{user?.name}</span>
        </span>

        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          {manager?.map((item) => (
            <Link to={item?.path} className='dropdown-menu_item'>{item?.title}</Link>
          ))}
        </ul>
      </div>
    </div>
  )
}
