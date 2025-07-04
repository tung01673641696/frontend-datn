import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './RentalRequestManager.scss'
import HeaderUser from '../../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../../layouts/UserLayout/FooterUser/FooterUser'
import BaseButton from '../../../components/BaseButton/BaseButton'
import CustomerItem from '../../../layouts/LandlordLayout/CustomerManagerLayout/CustomerItem/CustomerItem'
import { getAllRentalRequest } from '../../../redux/reducers/rentalRequest'
import { getAllDepositContractsByLandlord } from '../../../redux/reducers/contract'

export default function RentalRequestManager() {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("user"))
  const { id } = user
  const [statusRental, setStatusRental] = useState(['pending']);
  const { allRentalRequest } = useSelector((state) => state.rentalrequestReducer)
  const { allDepositContractsByLandlord } = useSelector((state) => state.contractReducer)

  console.log("<<<<<<<<", allRentalRequest)
  console.log(">>>>>>", allDepositContractsByLandlord)

  useEffect(() => {
    dispatch(getAllRentalRequest(id))
    dispatch(getAllDepositContractsByLandlord(id))
  }, [])


  const mergedRequests = [
    ...allRentalRequest.map(item => ({ ...item, type: 'rental_request' })),
    ...allDepositContractsByLandlord.map(item => ({
      ...item,
      type: 'contract',
      status: item.status === 'pending' ? 'pending_contract' : item.status
    }))
  ];

  console.log("mergedRequests>>>", mergedRequests)

  const filteredRequests = mergedRequests?.filter(
    (item) => statusRental.includes(item.status)
  );

  return (
    <div className='customer_manager'>
      <HeaderUser />
      <div className='customer_manager_main'>
        <h3>Khách hàng giữ chỗ</h3>

        <div className='customer_manager_main_status'>
          <div className='customer_manager_main_status_ele'>
            <BaseButton
              type={statusRental.includes('pending') ? 'red' : 'white'}
              onClick={() => setStatusRental(['pending'])}
            >
              Chờ xác nhận
            </BaseButton>
          </div>

          <div className='customer_manager_main_status_ele'>
            <BaseButton
              type={statusRental.includes('pending_contract') || statusRental.includes('approved') || statusRental.includes('signed') ? 'red' : 'white'}
              onClick={() => setStatusRental(['approved', 'signed', 'pending_contract'])}
            >
              Đã xác nhận
            </BaseButton>
          </div>

          <div className='customer_manager_main_status_ele'>
            <BaseButton
              type={statusRental.includes('reject') || statusRental.includes('cancelled') ? 'red' : 'white'}
              onClick={() => setStatusRental(['reject', 'cancelled'])}
            >
              Từ chối
            </BaseButton>
          </div>
        </div>

        <div className='customer_manager_main_child'>
          {filteredRequests?.map((item) => {
            const hasContract = allDepositContractsByLandlord.some(contract => contract.rental_request_id === item.id);
            return <CustomerItem key={item.id} item={item} hasContract={hasContract} />;
          })}
        </div>
      </div>
      <Footer />
    </div>
  )
}
