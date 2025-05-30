import React, { useState } from 'react'
import './RoomContent.scss'
import BaseButton from '../../../components/BaseButton/BaseButton'

export default function RoomContent({ room }) {
  const user = JSON.parse(localStorage.getItem("user"))
  const [showPhone, setShowPhone] = useState(false)

  return (
    <div className='room-content'>
      <h4>{room?.title}</h4>
      <span className='room-content_price'>Giá: {room.price ? `${Number(room.price).toLocaleString('vi-VN')}đ` : "Đang cập nhật"}</span>
      <span className='room-content_common'>Diện tích: {room?.area}m2</span>
      <span className='room-content_common'>Địa chỉ: {room?.house_address}</span>
      <div className='room-content_des'>
        <span className='room-content_des_title'>
          Mô tả chi tiết
        </span>
        <span className='room-content_des_text' style={{ whiteSpace: 'pre-line' }}>
          {room?.description?.replace(/\\n/g, '\n')}
        </span>
      </div>


      {user.role_id === 1 && (
        <div className='room-content_contact'>
          <div className='room-content_contact_tele'>
            <BaseButton type="red" onClick={() => setShowPhone(true)}>
              <i class="bi bi-telephone"></i>
              {showPhone ? room?.telephone_landlord : "Liên hệ ngay"}
            </BaseButton>
          </div>

          <div className='room-content_contact_like'>
            <BaseButton type="blue">
              Giữ chỗ
            </BaseButton>
          </div>
        </div>
      )}
    </div>
  )
}
