import React from 'react'
import "./DepositContractManager.scss"
import HeaderUser from '../../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../../layouts/UserLayout/FooterUser/FooterUser'
import CardDepositContract from '../../../layouts/TenantLayout/DepositContractManagerLayout/CardDepositContract/CardDepositContract'

export default function DepositContractManagerr() {
  const room = [
    {
      id: 1,
    },
    {
      id: 2,
    }
  ]

  return (
    <div className='deposit_contract_manager'>
      <HeaderUser />

      <div className='deposit_contract_manager_content'>
        <h3>Hợp đồng cọc của bạn</h3>

        <div className='deposit_contract_manager_content_item'>
          {room.map((item) => (
            <CardDepositContract />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
