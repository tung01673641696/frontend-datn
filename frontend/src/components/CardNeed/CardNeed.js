import React from 'react'
import './CardNeed.scss'
import Img from "../../assets/Images/NeedAvatar/avatar.png"
import { useNavigate } from 'react-router-dom'

export default function CardNeed({ item }) {
  const navigate = useNavigate()

  function handleClick() {
    navigate(`/search-room-need`)
    window.scrollTo(0, 0)
  }

  return (
    <div className='need' onClick={() => handleClick()}>
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
