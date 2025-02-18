import React, { useState, useEffect } from 'react'
import "./RoomNeed.scss"
import CardNeed from '../../../components/CardNeed/CardNeed'

export default function RoomNeed() {

  const [roomNeed, setRoomNeed] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/room-need")
      .then((res) => res.json())
      .then((data) => setRoomNeed(data))
  }, [])

  console.log("hihi", roomNeed)

  return (
    <div className='room-need'>
      <div className='room-need_wrap'>
        {roomNeed?.slice(0, 6).map((item) => (
          <CardNeed item={item} />
        ))}
      </div>

      <div className='room-need_button'>
        <button>Xem thêm</button>
      </div>
    </div>
  )
}
