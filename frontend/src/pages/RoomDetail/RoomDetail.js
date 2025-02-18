import React from 'react'
import './RoomDetail.scss'
import HeaderUser from '../../layouts/UserLayout/HeaderUser/HeaderUser'
import FooterUser from '../../layouts/UserLayout/FooterUser/FooterUser'
import RoomImage from '../../layouts/RoomDetailLayout/RoomImage/RoomImage'
import RoomContent from '../../layouts/RoomDetailLayout/RoomContent/RoomContent'
import RoomInfo from '../../layouts/RoomDetailLayout/RoomInfo/RoomInfo'
import RoomDescript from '../../layouts/RoomDetailLayout/RoomDescript/RoomDescript'

export default function RoomDetail() {
  return (
    <div className='room-detail'>
      <HeaderUser />

      <div className='room-detail_wrap'>
        <div className='room-detail_above'>
          <RoomImage />
          <RoomContent />
        </div>

        <div className='room-detail_below'>
          <RoomInfo />
          <RoomDescript />
        </div>
      </div>

      <FooterUser />
    </div>
  )
}
