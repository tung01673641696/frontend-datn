import React, { useEffect, useState } from 'react'
import "./RoomNeedSame.scss"
import CardNeed from '../../../components/CardNeed/CardNeed'
import BaseButton from '../../../components/BaseButton/BaseButton'

export default function RoomNeedSame() {

  const [roomSame, setRoomSame] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/room-need")
      .then((res) => res.json())
      .then((data) => setRoomSame(data))
  }, [])

  return (
    <div className='room_need_same'>
      <h3 className='room_need_same_title'>Bài đăng liên quan</h3>

      <div className='room_need_same_box'>
        <div className='room_need_same_box_ele'>
          {roomSame?.map((item) => (
            <CardNeed item={item} />
          ))}
        </div>

        <BaseButton type="red">Xem thêm</BaseButton>
      </div>
    </div>
  )
}
