import React, { useEffect, useState } from 'react'
import './RoomDetail.scss'
import HeaderUser from '../../layouts/UserLayout/HeaderUser/HeaderUser'
import FooterUser from '../../layouts/UserLayout/FooterUser/FooterUser'
import RoomImage from '../../layouts/RoomDetailLayout/RoomImage/RoomImage'
import RoomContent from '../../layouts/RoomDetailLayout/RoomContent/RoomContent'
import RoomInfo from '../../layouts/RoomDetailLayout/RoomInfo/RoomInfo'
import RoomDescript from '../../layouts/RoomDetailLayout/RoomDescript/RoomDescript'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getOneRoom } from '../../redux/reducers/room'

export default function RoomDetail() {
  const params = useParams()
  const dispatch = useDispatch()
  const id = params.id

  const { oneRoom } = useSelector((state) => state.roomReducer)

  useEffect(() => {
    if (!oneRoom || oneRoom.room_id !== id) {
      dispatch(getOneRoom(id));
    }
  }, [id])

  return (
    <div className='room-detail'>
      <HeaderUser />

      <div className='room-detail_wrap'>
        <div className='room-detail_above'>
          <RoomImage room={oneRoom} />
          <RoomContent room={oneRoom} />
        </div>

        <div className='room-detail_below'>
          <RoomInfo room={oneRoom} />
          <RoomDescript room={oneRoom} />
        </div>
      </div>

      <FooterUser />
    </div>
  )
}
