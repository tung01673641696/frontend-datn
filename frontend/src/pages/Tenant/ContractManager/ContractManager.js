import React, { useEffect, useState } from 'react'
import './ContractManager.scss'
import HeaderUser from '../../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../../layouts/UserLayout/FooterUser/FooterUser'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CardContract from '../../../layouts/TenantLayout/ContractManagerLayout/CardContract/CardContract'
import { tenantGetAllContract } from '../../../redux/reducers/contract'

export default function ContractManager() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("user"))
  const { id } = user

  const { allContractByTenant } = useSelector((state) => state.contractReducer)
  console.log(">>>>>>>", allContractByTenant)

  useEffect(() => {
    dispatch(tenantGetAllContract(1))
  }, [])

  return (
    <div className='contract_manager'>
      <HeaderUser />

      <div className='contract_manager_content'>
        <h3>Hợp đồng thuê phòng của bạn</h3>

        <div className='contract_manager_content_item'>
          {allContractByTenant?.map((item, index) => (
            <CardContract key={index} item={item} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
