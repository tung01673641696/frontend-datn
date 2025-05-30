import React from 'react'
import './RoomImage.scss'
import Img1 from '../../../assets/Images/RoomDetail/1.jpg'
import Img2 from '../../../assets/Images/RoomDetail/2.jpg'

export default function RoomImage({ room }) {
  const images = room?.image ? JSON.parse(room.image) : []
  const parsedImages = images.map((url) => {
    const match = url.match(/imgur\.com\/([a-zA-Z0-9]+)/)
    return match ? `https://i.imgur.com/${match[1]}.jpg` : url
  })

  return (
    <div className='room-image'>
      <div className='room-image_big'>
        {parsedImages[0] && <img src={parsedImages[0]} alt="Ảnh lớn" />}
      </div>

      <div className='room-image_small'>
        {parsedImages.slice(0, 5).map((img, index) => (
          <div className='room-image_mall_ele' key={index}>
            <img src={img} alt={`Ảnh nhỏ ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  )
}
