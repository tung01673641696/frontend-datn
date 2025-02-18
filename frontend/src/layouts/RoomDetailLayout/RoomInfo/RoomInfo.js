import React from 'react'
import './RoomInfo.scss'

export default function RoomInfo() {
  return (
    <div className='room-info'>

      <div className='room-info_above'>
        <span className='room-info_above_title'>Thông tin phòng</span>

        <div className='room-info_above_wrap'>
          <div className='room-info_above_ele'>
            <span className='room-info_above_ele_title'>Số phòng</span>
            <span className='room-info_above_ele_value'>301</span>
          </div>

          <div className='room-info_above_ele'>
            <span className='room-info_above_ele_title'>Tầng</span>
            <span className='room-info_above_ele_value'>3</span>
          </div>

          <div className='room-info_above_ele'>
            <span className='room-info_above_ele_title'>Số người</span>
            <span className='room-info_above_ele_value'>4</span>
          </div>

          <div className='room-info_above_ele'>
            <span className='room-info_above_ele_title'>Đặt cọc</span>
            <span className='room-info_above_ele_value'>4.000.000đ</span>
          </div>
        </div>
      </div>

      <div className='room-info_below'>
        <span className='room-info_below_title'>Phí dịch vụ</span>

        <div className='room-info_below_wrap'>
          <div className='room-info_below_ele'>
            <span className='room-info_below_ele_title'>Điện: </span>
            <span className='room-info_below_ele_value'>3.800đ / số</span>
          </div>

          <div className='room-info_below_ele'>
            <span className='room-info_below_ele_title'>Nước: </span>
            <span className='room-info_below_ele_value'>20.000đ / khối</span>
          </div>

          <div className='room-info_below_ele'>
            <span className='room-info_below_ele_title'>Wifi: </span>
            <span className='room-info_below_ele_value'>100.000đ / phòng</span>
          </div>

          <div className='room-info_below_ele'>
            <span className='room-info_below_ele_title'>Dịch vụ chung: </span>
            <span className='room-info_below_ele_value'>50.000đ / người</span>
          </div>
        </div>
      </div>
    </div>
  )
}
