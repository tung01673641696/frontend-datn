import React from 'react'
import "./CustomerItem.scss"
import Img from '../../../../assets/Images/User/client.jpg'
import BaseButton from '../../../../components/BaseButton/BaseButton'

export default function CustomerItem({ item }) {
  return (
    <div className='customer_item'>
      <div className='customer_item_ele'>
        <div className='customer_item_ele_avatar'>
          <img src={Img} />
        </div>

        <div className='customer_item_ele_content'>
          <span className='customer_item_ele_content_child'>{item?.renter_name}</span>
          <span className='customer_item_ele_content_child'>{item?.renter_phone}</span>
          <span className='customer_item_ele_content_child'>Thích: P{item?.room_name} - Nhà {item?.house_name}</span>
          <span className='customer_item_ele_content_child'>Địa chỉ nhà: {item?.house_address}</span>
          <span className='customer_item_ele_content_child'>{item?.reserved_at}</span>
          <span className='customer_item_ele_content_action'>
            <BaseButton type="white">Xác nhận</BaseButton>
            <BaseButton type="red">Từ chối</BaseButton>
          </span>
        </div>
      </div>
    </div>
  )
}
