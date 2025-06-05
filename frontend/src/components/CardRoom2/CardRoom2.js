import React from 'react'
import './CardRoom2.scss'
import Img from '../../assets/Images/Room/room.jpg'
import { useNavigate } from 'react-router-dom'

export default function CardRoom2({ item }) {
  const navigate = useNavigate()

  function handleClick() {
    navigate(`/room-detail/room_id/${item.room_id}`)
    window.scrollTo(0, 0)
  }

  return (
    <div className='card-room2' onClick={() => handleClick()}>
      <div className='card-room2_img'>
        {item.image && (() => {
          try {
            const rawImages = JSON.parse(item.image);
            const images = rawImages.map(link => {
              if (link.includes('imgur.com') && !link.includes('i.imgur.com')) {
                const id = link.split('/').pop();
                return `https://i.imgur.com/${id}.jpg`;
              }
              return link;
            });

            return images[0] ? (
              <img
                src={images[0]}
                alt="Room"
                style={{ width: '100%', objectFit: 'cover' }}
              />
            ) : null;
          } catch (error) {
            console.error("Lỗi khi parse image:", error);
            return null;
          }
        })()}
      </div>

      <div className='card-room2_content'>
        <span className='card-room2_content_title'>{item?.title}</span>
        <span className='card-room2_content_price'>{item.price ? `${Number(item.price).toLocaleString('vi-VN')}đ / tháng` : "Đang cập nhật"}</span>
        <span className='card-room2_content_address'>
          <i class="bi bi-geo-alt" style={{ marginRight: "5px" }}></i>
          {item.ward_name}
        </span>
        <span className='card-room2_content_district'>
          <i class="bi bi-house-door" style={{ marginRight: "5px" }}></i>
          {item.district_name}
        </span>
      </div>
    </div>
  )
}
