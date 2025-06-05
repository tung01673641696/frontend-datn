import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './RentalRequestManager.scss'
import HeaderUser from '../../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../../layouts/UserLayout/FooterUser/FooterUser'
import BaseButton from '../../../components/BaseButton/BaseButton'
import CustomerItem from '../../../layouts/LandlordLayout/CustomerManagerLayout/CustomerItem/CustomerItem'
import { getAllRentalRequest } from '../../../redux/reducers/rentalRequest'


export default function RentalRequestManager() {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("user"))
  const { id } = user
  const [statusRental, setStatusRental] = useState('pending');
  const { allRentalRequest } = useSelector((state) => state.rentalrequestReducer)

  useEffect(() => {
    dispatch(getAllRentalRequest(id))
  }, [])

  const filteredRequests = allRentalRequest?.filter(
    (item) => item.status === statusRental
  );

  return (
    <div className='customer_manager'>
      <HeaderUser />
      <div className='customer_manager_main'>
        <h3>Khách hàng giữ phòng</h3>

        <div className='customer_manager_main_status'>
          <div className='customer_manager_main_status_ele'>
            <BaseButton
              type={statusRental === 'pending' ? 'red' : 'white'}
              onClick={() => setStatusRental('pending')}
            >
              Chờ xác nhận
            </BaseButton>
          </div>

          <div className='customer_manager_main_status_ele'>
            <BaseButton
              type={statusRental === 'approved' ? 'red' : 'white'}
              onClick={() => setStatusRental('approved')}
            >
              Đã xác nhận
            </BaseButton>
          </div>

          <div className='customer_manager_main_status_ele'>
            <BaseButton
              type={statusRental === 'reject' ? 'red' : 'white'}
              onClick={() => setStatusRental('reject')}
            >
              Từ chối
            </BaseButton>
          </div>
        </div>

        <div className='customer_manager_main_child'>
          {filteredRequests?.map((item) => (
            <CustomerItem item={item} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
