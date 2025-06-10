import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './CardContract.scss'
import Img from '../../../../assets/Images/Contract/depositcontract.jpg'
import BaseButton from '../../../../components/BaseButton/BaseButton'

export default function CardContract({ item }) {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))
  const renterId = user.id

  return (
    <div className='card-contract'>
      <div className='card-contract_img'>
        <img src={Img} />
      </div>

      <div className='card-contract_content'>
        <span className='card-contract_content_title'>Hợp đồng thuê</span>
        <span className='card-contract_content_ele'>Phòng {item?.room_name} - Nhà {item?.house_name}</span>
        <span className='card-contract_content_address'>
          <span>Địa chỉ: </span>
          {item?.address}
        </span>
        <span className='card-contract_content_price'>Giá: {item.price}</span>

        <div className='card-contract_content_button'>
          <BaseButton type="blue" onClick={() => navigate(`/tenant/detail-rental-contract`)}>Xem hợp đồng thuê</BaseButton>
        </div>
      </div>
    </div>
  )
}
