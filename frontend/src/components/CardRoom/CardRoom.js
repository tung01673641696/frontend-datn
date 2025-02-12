import React from 'react'
import "./CardRoom.scss"

export default function CardRoom({ item }) {

  return (
    <div className='room_card'>
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