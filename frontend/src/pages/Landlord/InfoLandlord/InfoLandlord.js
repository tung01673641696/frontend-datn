import React from 'react'
import "./InfoLandlord.scss"
import HeaderUser from '../../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../../layouts/UserLayout/FooterUser/FooterUser'
import BaseInput from '../../../components/BaseInput/BaseInput'
import BaseButton from '../../../components/BaseButton/BaseButton'

export default function InfoLandlord() {
  return (
    <div className='info-landlord'>
      <HeaderUser />

      <div className='info-landlord_box'>
        <h3>Thông tin cá nhân</h3>

        <div className='info-landlord_box_item'>
          <BaseInput placeholder="Họ và tên" />
        </div>
        <div className='info-landlord_box_item'>
          <BaseInput placeholder="Số điện thoại" />
        </div>
        <div className='info-landlord_box_item'>
          <BaseButton type="red">Lưu chỉnh sửa</BaseButton>
        </div>
      </div>

      <Footer />
    </div>
  )
}
