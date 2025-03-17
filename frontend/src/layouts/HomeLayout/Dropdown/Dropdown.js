import React from 'react'
import "./Dropdown.scss"
import { useSelector } from 'react-redux'

export default function Dropdown() {
  const { user } = useSelector((state) => state.userReducer)

  return (
    <div>
      <div class="dropdown">
        <span class=" dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
          <span></span>
          <i class="bi bi-person-circle"></i>
          <span>{user.user.name}</span>
        </span>

        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li><a class="dropdown-item" href="#">Thông tin cá nhân</a></li>
          <li><a class="dropdown-item" href="#">Quản lý tin đăng</a></li>
          <li><a class="dropdown-item" href="#">Quản lý phòng yêu thích</a></li>
          <li><a class="dropdown-item" href="#">Quản lý giỏ hàng</a></li>
          <li><a class="dropdown-item" href="#">Quản lý đơn hàng đã đặt</a></li>
          <li><a class="dropdown-item" href="#">Đăng xuất</a></li>
        </ul>
      </div>
    </div>
  )
}
