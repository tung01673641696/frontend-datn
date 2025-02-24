import React, { useState, useEffect } from 'react'
import "./RoomNeed.scss"
import CardNeed from '../../../components/CardNeed/CardNeed'
import { useNavigate } from 'react-router-dom'
import BaseButton from '../../../components/BaseButton/BaseButton'

export default function RoomNeed() {
  const navigate = useNavigate()
  const [roomNeed, setRoomNeed] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/room-need")
      .then((res) => res.json())
      .then((data) => setRoomNeed(data))
  }, [])

  function handleClick() {
    navigate(`/search-need`)
    window.scrollTo(0, 0)
  }

  return (
    <div className='room-need'>
      <div className='room-need_wrap'>
        {roomNeed?.slice(0, 6).map((item) => (
          <CardNeed item={item} />
        ))}
      </div>

      <BaseButton type="red" onClick={() => handleClick()}>Xem thêm</BaseButton>

    </div>
  )
}
