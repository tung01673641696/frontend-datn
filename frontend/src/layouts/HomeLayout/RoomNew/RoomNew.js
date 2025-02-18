import React, { useEffect, useState } from 'react'
import "./RoomNew.scss"
import CardRoom from '../../../components/CardRoom/CardRoom'
import { useNavigate } from 'react-router-dom'

export default function RoomNew() {
  const [room, setRoom] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://localhost:3001/room")
      .then((response) => response.json())
      .then((data) => setRoom(data))
  }, [])

  function handleClick() {
    navigate(`/search-room`)
  }

  return (
    <div className='room'>
      <div className='room_wrap'>
        {room?.slice(0, 10).map((item) => (
          <CardRoom item={item} />
        ))}
      </div>

      <div className='room_button'>
        <button onClick={() => handleClick()}>Xem thêm</button>
      </div>
    </div>
  )
}