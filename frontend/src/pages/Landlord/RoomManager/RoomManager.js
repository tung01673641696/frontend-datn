import React from 'react'
import "./RoomManager.scss"
import Common from '../../../layouts/LandlordLayout/Common/Common'
import BaseButton from '../../../components/BaseButton/BaseButton'


export default function RoomManager() {
  return (
    <Common>
      <h3>Danh sách phòng</h3>

      <div className='select'>
        <div className='select_search'>
          <span className='select_search_title'>Nhà</span>
          <select>
            <option>Tất cả nhà</option>
            <option>Nhà Gohomy1</option>
            <option>Nhà Gohomy2</option>
          </select>
        </div>

        <div className='select_add'>
          <BaseButton type="blue">Thêm phòng</BaseButton>
        </div>
      </div>

      <div className='room_status'>
        <div className='room_status_ele'>
          <BaseButton>chỉ hiện phòng trống</BaseButton>
        </div>

        <div className='room_status_ele'>
          <BaseButton>chỉ hiện phòng đang ở</BaseButton>
        </div>
      </div>
    </Common>
  )
}
