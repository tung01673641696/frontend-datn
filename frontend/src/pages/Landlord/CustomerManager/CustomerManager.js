import React from 'react'
import './CustomerManager.scss'
import HeaderUser from '../../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../../layouts/UserLayout/FooterUser/FooterUser'
import BaseButton from '../../../components/BaseButton/BaseButton'
import CustomerItem from '../../../layouts/LandlordLayout/CustomerManagerLayout/CustomerItem/CustomerItem'

export default function CustomerManager() {
  const customer = [
    {
      id: 1
    },
    {
      id: 2
    },
    {
      id: 3
    },
    {
      id: 4
    },
  ]

  return (
    <div className='customer_manager'>
      <HeaderUser />
      <div className='customer_manager_main'>
        <h3>Khách hàng giữ chỗ</h3>

        <div className='customer_manager_main_status'>
          <div className='customer_manager_main_status_ele'>
            <BaseButton type="white" onClick="">Chờ xác nhận</BaseButton>
          </div>

          <div className='customer_manager_main_status_ele'>
            <BaseButton type="red" onClick="">Đã xác nhận</BaseButton>
          </div>

          <div className='customer_manager_main_status_ele'></div>
        </div>

        <div className='customer_manager_main_child'>
          {customer?.map(() => (
            <CustomerItem />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
