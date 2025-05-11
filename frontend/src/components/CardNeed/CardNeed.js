import React from 'react'
import './CardNeed.scss'
import Img from "../../assets/Images/NeedAvatar/avatar.png"
import { useNavigate } from 'react-router-dom'

export default function CardNeed({ item }) {
  const navigate = useNavigate()

  function handleClick() {
    navigate(`/need-detail`)
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
        <span>Giá: {Number(item.price).toLocaleString('vi-VN')}đ</span>
        <span>{item?.ward_name} - {item?.district_name}</span>
      </div>
    </div>
  )
}
