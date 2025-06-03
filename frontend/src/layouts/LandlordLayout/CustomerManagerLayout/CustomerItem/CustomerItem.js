import React, { useEffect } from 'react'
import "./CustomerItem.scss"
import Img from '../../../../assets/Images/User/client.jpg'
import BaseButton from '../../../../components/BaseButton/BaseButton'
import { useDispatch } from 'react-redux'
import { rejectRentalRequest } from '../../../../redux/reducers/rentalRequest'
import { approveRentalRequest } from '../../../../redux/reducers/rentalRequest'

export default function CustomerItem({ item }) {
  const dispatch = useDispatch()

  const handleReject = () => {
    dispatch(rejectRentalRequest(item.id))
  };

  const handleApprove = () => {
    dispatch(approveRentalRequest(item.id))
  }

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
            {item?.status === 'pending' ? (
              <>
                <BaseButton type="white" onClick={handleApprove}>Xác nhận</BaseButton>
                <BaseButton type="red" onClick={handleReject}>Từ chối</BaseButton>
              </>
            ) : item?.status === 'approved' ? (
              <>
                <BaseButton type="green">Tạo hợp đồng cọc</BaseButton>
                <BaseButton type="red" onClick={handleReject}>Từ chối</BaseButton>
              </>
            ) : <><BaseButton type="white" onClick={handleApprove}>Xác nhận</BaseButton></>}
          </span>
        </div>
      </div>
    </div>
  )
}
