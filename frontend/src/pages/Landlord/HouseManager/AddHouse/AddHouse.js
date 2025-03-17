import React, { useEffect, useState } from 'react'
import "./AddHouse.scss"
import Common from '../../../../layouts/LandlordLayout/Common/Common'
import BaseInput from '../../../../components/BaseInput/BaseInput'
import BaseButton from '../../../../components/BaseButton/BaseButton'
import { getDistrict } from '../../../../redux/reducers/address'
import { getWard } from '../../../../redux/reducers/address'
import { useDispatch, useSelector } from 'react-redux'

export default function AddHouse() {
  const dispatch = useDispatch()
  const { district, ward } = useSelector((state) => state.addressReducer)

  useEffect(() => {
    dispatch(getDistrict())
  }, [])

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;

    dispatch(getWard(districtId))

    console.log("id", districtId)
    console.log("ward", ward)
  }

  return (
    <Common>

      <form>
        <span>Thêm nhà</span>

        <div className='add_house_content'>
          <div className='add_house_content_ele'>
            <BaseInput placeholder="Tên nhà" />
          </div>
          <div className='add_house_content_ele'>
            <select>
              <option value="">Hà Nội</option>
            </select>
          </div>

          <div className='add_house_content_ele'>
            <select onChange={handleDistrictChange}>
              <option value="" selected disabled>Chọn Quận / Huyện</option>
              {district.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>

          <div className='add_house_content_ele'>
            <select>
              <option value="">Chọn Phường / Xã</option>
              {ward.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>

          <div className='add_house_content_ele'>
            <BaseInput placeholder="Địa chỉ chi tiết" />
          </div>

          <div className='add_house_content_ele'>
            <BaseButton type="blue">Thêm nhà</BaseButton>
          </div>
        </div>
      </form>
    </Common>
  )
}
