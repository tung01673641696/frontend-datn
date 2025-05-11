import React from 'react'
import './RoomContent.scss'
import BaseButton from '../../../components/BaseButton/BaseButton'

export default function RoomContent() {
  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <div className='room-content'>
      <h4>Phòng trọ mới giá rẻ,đầy đủ nội thất,tiện nghi,an toàn phòng cháy chữa cháy</h4>
      <span className='room-content_price'>Giá: 4.000.000đ / tháng</span>
      <span className='room-content_area'>Diện tích: 35m2</span>
      <span className='room-content_address'>Địa chỉ: 250 Kim Giang,Hoàng Mai,Hà Nội</span>
      <span className='room-content_land'>Chủ nhà: Nguyễn Đình Diệm</span>

      {user.role_id === 1 && (
        <div className='room-content_contact'>
          <div className='room-content_contact_tele'>
            <BaseButton type="red">
              <i class="bi bi-telephone"></i>
              Liên hệ ngay
            </BaseButton>
          </div>

          <div className='room-content_contact_like'>
            <BaseButton type="white">
              <i class="bi bi-heart"></i>
              Yêu thích phòng
            </BaseButton>
          </div>
        </div>
      )}
    </div>
  )
}
