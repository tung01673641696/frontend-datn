import React from 'react'
import './Register.scss'
import { Link } from 'react-router-dom'
import HeaderUser from '../../layouts/UserLayout/HeaderUser/HeaderUser'

export default function Register() {
  return (
    <div className='register'>
      <HeaderUser />

      <div className='register_box'>
        <h3 className='register_title'>Đăng ký tài khoản</h3>

        <div className='register_content'>
          <div className="register_content_child">
            <input
              type="text"
              placeholder="Họ và tên"
              required
            />
          </div>

          <div className="register_content_child">
            <input
              type="text"
              placeholder="Số điện thoại"
              required
            />
          </div>

          <div className="register_content_child">
            <input
              type="text"
              placeholder="Mật khẩu"
              required
            />
          </div>

          <div className="register_content_child">
            <input
              type="text"
              placeholder="Nhập lại mật khẩu"
              required
            />
          </div>

          <div className='register_content_child'>
            <select name="role">
              <option value="" selected disabled>Loại tài khoản</option>
              <option value="tenant">Người thuê</option>
              <option value="landlord">Chủ nhà</option>
            </select>
          </div>

          <div className='register_content_child'>
            <button className="register_handle">
              Đăng ký
            </button>
          </div>

          <div className='register_link'>
            <span><Link to="/" className='register_link_decor'>Quay lại trang chủ</Link></span>
          </div>
        </div>
      </div>
    </div>
  )
}
