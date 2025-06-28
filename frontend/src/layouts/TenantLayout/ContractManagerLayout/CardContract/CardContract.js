import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './CardContract.scss'
import Img from '../../../../assets/Images/Contract/depositcontract.jpg'
import BaseButton from '../../../../components/BaseButton/BaseButton'
import DetailRentalContract from '../../../../pages/Tenant/DetailRentalContract/DetailRentalContract'
import BaseModal from '../../../../components/BaseModal/BaseModal'

export default function CardContract({ item }) {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))
  const renterId = user.id

  const [selectRoomId, setSelectRoomId] = useState()

  const [showViewContract, setShowViewContract] = useState(false)

  const handleShowContract = (roomId) => {
    console.log(">>>>>>", roomId)
    setSelectRoomId(roomId);
    setShowViewContract(true)
  };

  return (
    <div className='card-contract'>
      <div className='card-contract_img'>
        <img src={Img} />
      </div>

      <div className='card-contract_content'>
        <span className='card-contract_content_title'>Hợp đồng thuê</span>
        <span className='card-contract_content_ele'>Phòng {item?.room?.name} - Nhà {item?.house?.name}</span>
        <span className='card-contract_content_address'>
          <span>Địa chỉ: </span>
          {item?.house?.address}
        </span>
        <span className='card-contract_content_ele'>Thời hạn: 17/02/2025 - 25/02/2025</span>
        <span className='card-contract_content_price'>Giá: {item.room.price ? `${Number(item.room.price).toLocaleString('vi-VN')}đ` : "Đang cập nhật"}</span>

        <div className='card-contract_content_button'>
          <BaseButton type="blue" onClick={() => handleShowContract(item.room.id)}>Xem hợp đồng thuê</BaseButton>
        </div>
      </div>

      <BaseModal
        open={showViewContract}
        type="blue"
        width="50%"
        title="Xem chi tiết hợp đồng thuê"
        content={<DetailRentalContract roomId={selectRoomId} />}
        onCancel={() => setShowViewContract(false)}
        showCancel={false}
        showConfirm={false}
      />
    </div>
  )
}
