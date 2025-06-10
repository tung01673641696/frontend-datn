import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import "./CardDepositContract.scss"
import Img from '../../../../assets/Images/Contract/depositcontract.jpg'
import BaseButton from '../../../../components/BaseButton/BaseButton'

export default function CardDepositContract({ item }) {
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("user"))
  const renterId = user.id

  return (
    <div className='card-deposit-contract'>
      <div className='card-deposit-contract_img'>
        <img src={Img} />
      </div>

      <div className='card-deposit-contract_content'>
        <span className='card-deposit-contract_content_title'>Hợp đồng cọc</span>
        <span className='card-deposit-contract_content_ele'>Phòng {item?.room_name} - Nhà {item?.house_name}</span>
        <span className='card-deposit-contract_content_address'>
          <span>Địa chỉ: </span>
          {item?.house_address}
        </span>
        <span className='card-deposit-contract_content_price'>Giá: {item.room_price ? `${Number(item.room_price).toLocaleString('vi-VN')}đ` : "Đang cập nhật"}</span>

        <div className='card-deposit-contract_content_button'>
          <BaseButton type="blue" onClick={() => navigate(`/tenant/deposit-contract-detail/renter/${renterId}/room/${item.room_id}`)}>Xem hợp đồng cọc</BaseButton>
        </div>
      </div>
    </div>
  )
}
