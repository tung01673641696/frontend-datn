import React from 'react'
import "./Dropdown.scss"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Dropdown() {
  const { user } = useSelector((state) => state.userReducer)

  const manager = [
    { id: 1, title: 'Thông tin cá nhân', path: '' },
    { id: 2, title: 'Đăng bài tìm phòng', path: '' },
    { id: 3, title: 'Quản lý bài đăng', path: '/tenant/post-manager' },
    { id: 4, title: 'Quản lý phòng yêu thích', path: '/tenant/room-like-manager' },
    { id: 5, title: 'Quản lý giỏ hàng', path: '' },
    { id: 6, title: 'Quản lý đơn hàng đã đặt', path: '' },
    { id: 7, title: 'Đăng xuất', path: '' },
  ]

  return (
    <div>
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
