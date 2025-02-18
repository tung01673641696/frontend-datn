import React from 'react'
import "./CardRoom.scss"
import { useNavigate } from 'react-router-dom'

export default function CardRoom({ item }) {
  const navigate = useNavigate()

  function handleClick() {
    navigate(`/room-detail`)
    window.scrollTo(0, 0)
  }

  return (
    <div className='room_card' onClick={() => handleClick()}>
      <div className='room_card_img'>
        <img src={item.image} />
      </div>

      <div className='room_card_content'>
        <h4 className='room_card_content_title'>{item?.room_title}</h4>
        <span>Diện tích: {item?.area}m2</span>
        <span className='room_card_content_price'>Giá: {item?.price.toLocaleString("de-DE")}đ</span>
        <span>{item?.district}</span>
      </div>
    </div>
  )
}