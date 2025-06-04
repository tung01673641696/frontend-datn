import React, { useEffect, useState } from 'react'
import "./DepositContractManager.scss"
import HeaderUser from '../../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../../layouts/UserLayout/FooterUser/FooterUser'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CardDepositContract from '../../../layouts/TenantLayout/DepositContractManagerLayout/CardDepositContract/CardDepositContract'
import { getAllDepositContractByRenter } from '../../../redux/reducers/contract'

export default function DepositContractManagerr() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("user"))
  const { id } = user

  const { allDepositContractByRenter } = useSelector((state) => state.contractReducer)

  useEffect(() => {
    dispatch(getAllDepositContractByRenter(id));
  }, [id]);

  console.log("tất cả hợp đồng cọc của lâm", allDepositContractByRenter)

  return (
    <div className='deposit_contract_manager'>
      <HeaderUser />

      <div className='deposit_contract_manager_content'>
        <h3>Hợp đồng cọc của bạn</h3>

        <div className='deposit_contract_manager_content_item'>
          {allDepositContractByRenter?.map((item, index) => (
            <CardDepositContract key={index} item={item} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
