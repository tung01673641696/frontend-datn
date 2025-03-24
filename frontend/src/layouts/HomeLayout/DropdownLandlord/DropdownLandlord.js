import React from 'react'
import "./DropdownLandlord.scss"
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export default function DropdownLandlord() {
  const navigate = useNavigate()
  const user = localStorage.getItem('user') === null ? null : JSON.parse(localStorage.getItem('user'));
  function handleClick() {
    navigate('/landlord/post')
  }

  const manager = [
    { id: 1, title: 'Thông tin cá nhân', path: '/landlord/info-landlord' },
    { id: 2, title: 'Quản lý chung', path: '/landlord/dashboard' },
    { id: 3, title: 'Quản lý bài đăng', path: '' },
    { id: 4, title: 'Quản lý khách hàng tiềm năng', path: '/landlord/customer-manager' },
    { id: 5, title: 'Quản lý nhu cầu yêu thích', path: '' },
    { id: 6, title: 'Quản lý giỏ hàng', path: '' },
    { id: 7, title: 'Quản lý đơn hàng đã đặt', path: '' },
    { id: 8, title: 'Đăng xuất', path: '' },
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
