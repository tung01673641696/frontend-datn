import React, { useEffect, useState } from 'react'
import "./AddVehicle.scss"
import Common from '../../../../layouts/LandlordLayout/Common/Common'
import BaseInput from '../../../../components/BaseInput/BaseInput'
import BaseButton from '../../../../components/BaseButton/BaseButton'
import { useDispatch, useSelector } from 'react-redux'
import { addHouse } from '../../../../redux/reducers/house'
import { useNavigate } from 'react-router-dom'

export default function AddVehicle() {

  return (
    <Common>
      <form className='add_vehicle'>
        <span className='add_vehicle_title'>Thêm phương tiện</span>

        <div className='add_vehicle_box'>
          <div className='add_vehicle_box_child'>
            <div className='add_vehicle_box_child_ele'>
              <select className='add_vehicle_box_child_select'>
                <option>Chọn nhà</option>
                <option></option>
              </select>
            </div>

            <div className='add_vehicle_box_child_ele'>
              <select className='add_vehicle_box_child_select'>
                <option>Chọn phòng</option>
                <option></option>
              </select>
            </div>
          </div>

          <div className='add_vehicle_box_child'>
            <div className='add_vehicle_box_child_ele'>
              <select className='add_vehicle_box_child_select'>
                <option>Chọn khách thuê</option>
                <option></option>
              </select>
            </div>

            <div className='add_vehicle_box_child_ele'>
              <select className='add_vehicle_box_child_select'>
                <option>Loại xe</option>
                <option></option>
              </select>
            </div>
          </div>

          <div className='add_vehicle_box_child'>
            <BaseInput placeholder="Biển số xe" />
          </div>

          <div className='add_vehicle_button'>
            <BaseButton type="blue">Thêm phương tiện</BaseButton>
          </div>
        </div>
      </form>
    </Common>
  )
}
