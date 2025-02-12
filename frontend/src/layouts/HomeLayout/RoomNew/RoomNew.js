import React, { useEffect, useState } from 'react'
import "./RoomNew.scss"
import CardRoom from '../../../components/CardRoom/CardRoom'

export default function RoomNew() {
  const [room, setRoom] = useState([])


  useEffect(() => {
    fetch("http://localhost:3001/room")
      .then((response) => response.json())
      .then((data) => setRoom(data))
  }, [])

  return (
    <div className='room'>
      <div className='room_wrap'>
        {room?.slice(0, 10).map((item) => (
          <CardRoom item={item} />
        ))}
      </div>
    </div>
  )
}