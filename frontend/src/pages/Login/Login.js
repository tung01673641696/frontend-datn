import React from 'react'
import './Login.scss'
import HeaderUser from '../../layouts/UserLayout/HeaderUser/HeaderUser'
import { Link } from 'react-router-dom'
import BaseButton from '../../components/BaseButton/BaseButton'
import BaseInput from '../../components/BaseInput/BaseInput'

export default function Login() {
  return (
    <div className='login'>
      <HeaderUser />

      <div className='login_box'>
        <h3 className='login_title'>Đăng nhập</h3>

        <div className='login_content'>
          <div className="login_content_child">
            <BaseInput placeholder="Số điện thoại" />
          </div>

          <div className="login_content_child">
            <BaseInput placeholder="Mật khẩu" />
          </div>

          <div className='login_content_child'>
            <BaseButton type="red">
              Đăng nhập
            </BaseButton>
          </div>

          <div className='login_link'>
            <span><Link to="/" className='login_link_decor'>Quay lại trang chủ</Link></span>
          </div>
        </div>
      </div>
    </div>
  )
}
