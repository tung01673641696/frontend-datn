import React from 'react'
import './CardRoom2.scss'
import Img from '../../assets/Images/Room/room.jpg'

export default function CardRoom2() {
  return (
    <div className='card-room2'>
      <div className='card-room2_img'>
        <img src={Img} />
      </div>

      <div className='card-room2_content'>
        <span className='card-room2_content_title'>Phòng trọ mới đầy đủ nội thất trung tâm thành phố</span>
        <span className='card-room2_content_price'>4.000.000đ / tháng</span>
        <span className='card-room2_content_address'>
          <i class="bi bi-geo-alt" style={{ marginRight: "5px" }}></i>
          250 Kim Giang,Quận Hoàng Mai,Hà Nội
        </span>
        <span className='card-room2_content_district'>
          <i class="bi bi-house-door" style={{ marginRight: "5px" }}></i>
          Quận Hoàng Mai
        </span>
      </div>
    </div>
  )
}
