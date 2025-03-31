import React, { useEffect, useState } from 'react'
import "./EditHouse.scss"
import Common from '../../../../layouts/LandlordLayout/Common/Common'
import BaseInput from '../../../../components/BaseInput/BaseInput'
import BaseButton from '../../../../components/BaseButton/BaseButton'
import { getDistrict } from '../../../../redux/reducers/address'
import { getWard } from '../../../../redux/reducers/address'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getOneHouse } from '../../../../redux/reducers/house'


export default function EditHouse() {
  const params = useParams()
  const dispatch = useDispatch()
  const { district, ward } = useSelector((state) => state.addressReducer)
  const { oneHouse } = useSelector((state) => state.houseReducer)

  const [house, setHouse] = useState({
    name: "",
    address: "",
    district_id: "",
    ward_id: ""
  })

  useEffect(() => {
    dispatch(getOneHouse(params.id))
    dispatch(getDistrict())
  }, [])

  // const handleDistrictChange = (e) => {
  //   const district_id = e.target.value;
  //   setHouse({ ...house, district_id, ward_id: "" })
  //   dispatch(getWard(district_id))
  // }

  // const handleChange = (e) => {
  //   setHouse({ ...house, [e.target.name]: e.target.value })
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault()

  // }

  return (
    <Common>
      <form onSubmit="">
        <span>Cập nhật nhà</span>

        <div className='add_house_content'>
          <div className='add_house_content_ele'>
            <BaseInput name="name" value={oneHouse?.name} placeholder="Tên nhà" onChange="" />
          </div>
          <div className='add_house_content_ele'>
            <select>
              <option value="">Hà Nội</option>
            </select>
          </div>

          <div className='add_house_content_ele'>
            <select name='district_id' onChange="">
              <option value="">Chọn Quận / Huyện</option>
              {district.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>

          <div className='add_house_content_ele'>
            <select name='ward_id' onChange="">
              <option value="">Chọn Phường / Xã</option>
              {ward.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>

          <div className='add_house_content_ele'>
            <BaseInput name="address" value={oneHouse?.address} placeholder="Địa chỉ chi tiết" onChange="" />
          </div>

          <div className='add_house_content_ele'>
            <BaseButton type="blue">Cập nhật nhà</BaseButton>
          </div>
        </div>
      </form>
    </Common>
  )
}
