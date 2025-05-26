import React from 'react'
import './InfoUser.scss'
import HeaderUser from '../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../layouts/UserLayout/FooterUser/FooterUser'
import BaseInput from '../../components/BaseInput/BaseInput'
import BaseButton from '../../components/BaseButton/BaseButton'

export default function InfoUser() {
  const user = localStorage.getItem('user') === null ? null : JSON.parse(localStorage.getItem('user'));
  console.log(">>>>>", user)

  return (
    <div className='info-user'>
      <HeaderUser />

      <div className='info-user_box'>
        <h3>Thông tin cá nhân</h3>

        <div className='info-user_box_item'>
          <BaseInput placeholder="Họ và tên" />
        </div>

        <div className='info-user_box_item'>
          <BaseInput placeholder="Họ và tên" />
        </div>
        <div className='info-user_box_item'>
          <BaseInput placeholder="Số điện thoại" />
        </div>
        <div className='info-user_box_item'>
          <BaseButton type="red">Lưu chỉnh sửa</BaseButton>
        </div>
      </div>

      <Footer />
    </div>
  )
}
