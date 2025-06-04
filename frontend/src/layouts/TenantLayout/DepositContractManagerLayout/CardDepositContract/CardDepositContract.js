import React from 'react'
import "./CardDepositContract.scss"
import Img from '../../../../assets/Images/Contract/depositcontract.jpg'
import BaseButton from '../../../../components/BaseButton/BaseButton'

export default function CardDepositContract() {
  return (
    <div className='card-deposit-contract'>
      <div className='card-deposit-contract_img'>
        <img src={Img} />
      </div>

      <div className='card-deposit-contract_content'>
        <span className='card-deposit-contract_content_title'>Hợp đồng cọc giữ phòng</span>
        <span className='card-deposit-contract_content_ele'>Phòng 101 - Nhà Gohomy1</span>
        <span className='card-deposit-contract_content_address'>
          <span>Địa chỉ: </span>
          250 Kim Giang, Quận Hoàng Mai
        </span>
        <span className='card-deposit-contract_content_price'>Giá phòng: 4.000.000đ / tháng</span>

        <div className='card-deposit-contract_content_button'>
          <BaseButton type="blue">Xem hợp đồng cọc</BaseButton>
        </div>
      </div>
    </div>
  )
}
