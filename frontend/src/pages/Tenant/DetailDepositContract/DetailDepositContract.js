import React from 'react'
import './DetailDepositContract.scss'
import HeaderUser from '../../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../../layouts/UserLayout/FooterUser/FooterUser'
import BaseButton from '../../../components/BaseButton/BaseButton'

export default function DetailDepositContract() {
  return (
    <div className='detail_deposit_contract'>
      <HeaderUser />

      <div className='detail_deposit_contract_box'>
        <h3>Chi tiết hợp đồng cọc</h3>

        <div className='detail_deposit_contract_box_item'>
          <h4>Đại diện bên thuê</h4>
          <span>Họ và tên: Hoàng Thanh Tùng</span>
          <span>Số điện thoại: 0373641696</span>
        </div>

        <div className='detail_deposit_contract_box_item'>
          <h4>Đại diện bên chủ nhà</h4>
          <span>Họ và tên: Đỗ Văn Hiểu</span>
          <span>Số điện thoại: 0373641696</span>
        </div>

        <div className='detail_deposit_contract_box_item'>
          <h4>Thông tin phòng</h4>
          <span>Phòng 101 - Nhà Gohomy1</span>
          <span>Địa chỉ: 250 Kim Giang, quận Hoàng Mai</span>
          <span>giá thuê: 4.000.000đ / tháng</span>
          <span>Đã cọc: 1.000.000đ</span>
          <span>Ngày khách vào ở: 4/6/2035</span>
          <span>Cam kết: Nếu đến ngày 4/6/2025,Khách hàng không đến kí hợp đồng thuê phòng thì số tiền cọc sẽ không được hoàn lại</span>
        </div>

        <div className='detail_deposit_contract_box_button'>
          <BaseButton type="red">Hủy hợp đồng cọc</BaseButton>
          <BaseButton>Quay lại</BaseButton>
        </div>
      </div>

      <Footer />
    </div>
  )
}
