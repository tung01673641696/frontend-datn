import React from 'react'
import './RoomImage.scss'
import Img1 from '../../../assets/Images/RoomDetail/1.jpg'
import Img2 from '../../../assets/Images/RoomDetail/2.jpg'

export default function RoomImage() {
  return (
    <div className='room-image'>
      <div className='room-image_big'>
        <img src={Img1} />
      </div>

      <div className='room-image_small'>
        <div className='room-image_mall_ele'>
          <img src={Img2} />
        </div>

        <div className='room-image_mall_ele'>
          <img src={Img2} />
        </div>

        <div className='room-image_mall_ele'>
          <img src={Img2} />
        </div>

        <div className='room-image_mall_ele'>
          <img src={Img2} />
        </div>
      </div>
    </div>
  )
}
