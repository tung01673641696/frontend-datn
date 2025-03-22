import React, { useEffect, useState } from 'react'
import "./AddTenant.scss"
import Common from '../../../../layouts/LandlordLayout/Common/Common'
import BaseInput from '../../../../components/BaseInput/BaseInput'
import BaseButton from '../../../../components/BaseButton/BaseButton'
import { useDispatch, useSelector } from 'react-redux'
import { addHouse } from '../../../../redux/reducers/house'
import { useNavigate } from 'react-router-dom'

export default function AddTenant() {

  return (
    <Common>
      <form className='add_tenant'>
        <span className='add_tenant_title'>Thêm khách thuê</span>

        <div className='add_tenant_box'>
          <div className='add_tenant_box_child'>
            <div className='add_tenant_box_child_ele'>
              <select className='add_tenant_box_child_select'>
                <option>Chọn nhà</option>
                <option></option>
              </select>
            </div>

            <div className='add_tenant_box_child_ele'>
              <select className='add_tenant_box_child_select'>
                <option>Chọn phòng</option>
                <option></option>
              </select>
            </div>
          </div>

          <div className='add_tenant_box_child'>
            <div className='add_tenant_box_child_ele'>
              <BaseInput placeholder="Họ và tên" />
            </div>

            <div className='add_tenant_box_child_ele'>
              <BaseInput placeholder="Số điện thoại" />
            </div>
          </div>

          <div className='add_tenant_box_child'>
            <textarea
              onChange=""
              placeholder="Ghi chú"
            />
          </div>

          <div className='add_tenant_button'>
            <BaseButton type="blue">Thêm khách thuê</BaseButton>
          </div>
        </div>
      </form>
    </Common>
  )
}
