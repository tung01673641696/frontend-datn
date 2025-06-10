import React from 'react'
import './ContractManager.scss'
import HeaderUser from '../../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../../layouts/UserLayout/FooterUser/FooterUser'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CardContract from '../../../layouts/TenantLayout/ContractManagerLayout/CardContract/CardContract'

export default function ContractManager() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("user"))
  const { id } = user

  const contract = [
    {
      'id': 1,
      'room_name': '101',
      'house_name': 'Nhà Gohomy1',
      'address': '250 Kim Giang',
      'price': '3.500.000đ'
    },
    {
      'id': 2,
      'room_name': '201',
      'house_name': 'Nhà Gohomy1',
      'address': '250 Kim Giang',
      'price': '4.500.000đ'
    },
  ]

  return (
    <div className='contract_manager'>
      <HeaderUser />

      <div className='contract_manager_content'>
        <h3>Hợp đồng thuê phòng của bạn</h3>

        <div className='contract_manager_content_item'>
          {contract?.map((item, index) => (
            <CardContract key={index} item={item} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
