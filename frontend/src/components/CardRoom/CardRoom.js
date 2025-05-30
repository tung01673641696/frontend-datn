import React, { useEffect } from 'react'
import "./CardRoom.scss"  
import { useNavigate } from 'react-router-dom'

export default function CardRoom({ item }) {
  const navigate = useNavigate()

  function handleClick() {
    navigate(`/room-detail/room_id/${item.room_id}`)
    window.scrollTo(0, 0)
  }

  return (
    <div className='room_card' onClick={() => handleClick()}>
      <div className='room_card_img'>
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

      <div className='room_card_content'>
        <h4 className='room_card_content_title'>{item?.title}</h4>
        <span>Diện tích: {item?.area}m2</span>
        <span className='room_card_content_price'>Giá: {item.price ? `${Number(item.price).toLocaleString('vi-VN')}đ` : "Đang cập nhật"}</span>
        <span>{item?.ward_name}</span>
        <span>{item?.district_name}</span>
      </div>
    </div>
  )
}