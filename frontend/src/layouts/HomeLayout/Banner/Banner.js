import React from 'react'
import Img from "../../../assets/Images/Banner/banner.jpg"
import './Banner.scss'

function Banner() {
  return (
    <div className='banner'>
      <img src={Img} />
      <span className='banner_content'>HỆ THỐNG THUÊ VÀ CHO THUÊ PHÒNG TRỌ</span>
    </div>
  )
}

export default Banner