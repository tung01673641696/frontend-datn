import React, { useEffect, useState } from 'react'
import "./RoomSame.scss"
import CardRoom from '../../../components/CardRoom/CardRoom'

export default function RoomSame() {
  const [roomSame, setRoomSame] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/room")
      .then((response) => response.json())
      .then((data) => setRoomSame(data))
  }, [])

  return (
    <div className='room-same'>
      <h3>Bài đăng liên quan</h3>

      <div className='room-same_box'>
        <div className='room-same_box_ele'>
          {roomSame?.slice(0, 10)?.map((item) => (
            <CardRoom item={item} />
          ))}
        </div>

        <div className='room-same_box_button'>
          <button>Xem thêm</button>
        </div>
      </div>
    </div>
  )
}
