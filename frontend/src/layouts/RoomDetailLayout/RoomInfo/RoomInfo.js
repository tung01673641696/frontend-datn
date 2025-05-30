import React from 'react'
import './RoomInfo.scss'

export default function RoomInfo({ room }) {
  return (
    <div className='room-info'>
      <div className='room-info_above'>
        <span className='room-info_above_title'>Thông tin phòng</span>

        <div className='room-info_above_wrap'>
          <div className='room-info_above_ele'>
            <span className='room-info_above_ele_title'>Số phòng</span>
            <span className='room-info_above_ele_value'>{room?.name}</span>
          </div>

          <div className='room-info_above_ele'>
            <span className='room-info_above_ele_title'>Tầng</span>
            <span className='room-info_above_ele_value'>{room?.floor}</span>
          </div>

          <div className='room-info_above_ele'>
            <span className='room-info_above_ele_title'>Số người</span>
            <span className='room-info_above_ele_value'>{room?.user_number}</span>
          </div>

          <div className='room-info_above_ele'>
            <span className='room-info_above_ele_title'>Đặt cọc</span>
            <span className='room-info_above_ele_value'>{room.price ? `${Number(room.price_deposit).toLocaleString('vi-VN')}đ` : "Đang cập nhật"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
