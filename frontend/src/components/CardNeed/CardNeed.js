import React from 'react'
import './CardNeed.scss'
import Img from "../../assets/Images/NeedAvatar/avatar.png"

export default function CardNeed({ item }) {
  return (
    <div className='need'>
      <div className='need_img'>
        <img src={Img} />
      </div>

      <div className='need_content'>
        <span className='need_content_title'>{item?.title}</span>
        <span>Loại phòng: {item?.room_type}</span>
        <span>Giá từ: {item?.price}</span>
        <span>{item?.address}</span>
      </div>
    </div>
  )
}
