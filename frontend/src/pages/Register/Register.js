import React from 'react'
import './Register.scss'
import { Link } from 'react-router-dom'
import HeaderUser from '../../layouts/UserLayout/HeaderUser/HeaderUser'
import BaseButton from '../../components/BaseButton/BaseButton'
import BaseInput from '../../components/BaseInput/BaseInput'

export default function Register() {
  return (
    <div className='register'>
      <HeaderUser />

      <div className='register_box'>
        <h3 className='register_title'>Đăng ký tài khoản</h3>

        <div className='register_content'>
          <div className="register_content_child">
            <BaseInput placeholder="Họ và tên" />
          </div>

          <div className="register_content_child">
            <BaseInput placeholder="Số điện thoại" />
          </div>

          <div className="register_content_child">
            <BaseInput placeholder="Mật khẩu" />
          </div>

          <div className="register_content_child">
            <BaseInput placeholder="Nhập lại mật khẩu" />
          </div>

          <div className='register_content_child'>
            <select name="role">
              <option value="" selected disabled>Loại tài khoản</option>
              <option value="tenant">Người thuê</option>
              <option value="landlord">Chủ nhà</option>
            </select>
          </div>

          <div className='register_content_child'>
            <BaseButton type="red">
              Đăng ký
            </BaseButton>
          </div>

          <div className='register_link'>
            <span><Link to="/" className='register_link_decor'>Quay lại trang chủ</Link></span>
          </div>
        </div>
      </div>
    </div>
  )
}
