import React from 'react'
import "./CustomerItem.scss"
import Img from '../../../../assets/Images/User/client.jpg'
import BaseButton from '../../../../components/BaseButton/BaseButton'

export default function CustomerItem() {
  return (
    <div className='customer_item'>
      <div className='customer_item_ele'>
        <div className='customer_item_ele_avatar'>
          <img src={Img} />
        </div>

        <div className='customer_item_ele_content'>
          <span className='customer_item_ele_content_child'>Hoàng Thanh Tùng</span>
          <span className='customer_item_ele_content_child'>0373641696</span>
          <span className='customer_item_ele_content_child'>Thích: P101 - Nhà Gohomy1</span>
          <span className='customer_item_ele_content_child'>14h 22/03/2025</span>
          <span className='customer_item_ele_content_action'>
            <BaseButton type="white">Chưa tư vấn</BaseButton>
            <BaseButton type="red">Đã tư vấn</BaseButton>
          </span> 
        </div>
      </div>
    </div>
  )
}
