import React from 'react'
import './RoomDescript.scss'

export default function RoomDescript({ room }) {
  return (
    <div className='room-info'>
      <div className='room-info_below'>
        <span className='room-info_below_title'>Phí dịch vụ</span>

        <div className='room-info_below_wrap'>
          <div className='room-info_below_ele'>
            <span className='room-info_below_ele_title'>Điện: </span>
            <span className='room-info_below_ele_value'>{room.electric_price ? `${Number(room.electric_price).toLocaleString('vi-VN')}đ` : "0đ"} / số</span>
          </div>

          <div className='room-info_below_ele'>
            <span className='room-info_below_ele_title'>Nước: </span>
            <span className='room-info_below_ele_value'>{room.water_price ? `${Number(room.electric_price).toLocaleString('vi-VN')}đ` : "0đ"} / khối</span>
          </div>
        </div>
      </div>
    </div>
  )
}
