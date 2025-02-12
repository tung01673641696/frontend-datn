import React from 'react'
import './Login.scss'
import HeaderUser from '../../layouts/UserLayout/HeaderUser/HeaderUser'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='login'>
      <HeaderUser />

      <div className='login_box'>
        <h3 className='login_title'>Đăng nhập</h3>

        <div className='login_content'>
          <div className="login_content_child">
            <input
              type="text"
              placeholder="Số điện thoại"
              required
            />
          </div>

          <div className="login_content_child">
            <input
              type="text"
              placeholder="Mật khẩu"
              required
            />
          </div>

          <div className='login_content_child'>
            <button className="login_handle">
              Đăng nhập
            </button>
          </div>

          <div className='login_link'>
            <span><Link to="/" className='login_link_decor'>Quay lại trang chủ</Link></span>
          </div>
        </div>
      </div>
    </div>
  )
}
