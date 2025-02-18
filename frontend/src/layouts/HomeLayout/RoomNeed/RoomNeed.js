import React, { useState, useEffect } from 'react'
import "./RoomNeed.scss"
import CardNeed from '../../../components/CardNeed/CardNeed'
import { useNavigate } from 'react-router-dom'

export default function RoomNeed() {
  const navigate = useNavigate()
  const [roomNeed, setRoomNeed] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/room-need")
      .then((res) => res.json())
      .then((data) => setRoomNeed(data))
  }, [])

  function handleClick() {
    navigate(`/search-room-need`)
    window.scrollTo(0, 0)
  }

  return (
    <div className='room-need'>
      <div className='room-need_wrap'>
        {roomNeed?.slice(0, 6).map((item) => (
          <CardNeed item={item} />
        ))}
      </div>

      <div className='room-need_button'>
        <button onClick={() => handleClick()}>Xem thêm</button>
      </div>
    </div>
  )
}
