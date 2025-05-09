import React, { useEffect, useState } from 'react'
import "./AddHouse.scss"
import Common from '../../../../layouts/LandlordLayout/Common/Common'
import BaseInput from '../../../../components/BaseInput/BaseInput'
import BaseButton from '../../../../components/BaseButton/BaseButton'
import { getDistrict } from '../../../../redux/reducers/address'
import { getWard } from '../../../../redux/reducers/address'
import { useDispatch, useSelector } from 'react-redux'
import { addHouse } from '../../../../redux/reducers/house'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function AddHouse() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { district, ward } = useSelector((state) => state.addressReducer)
  const user = JSON.parse(localStorage.getItem('user'))
  const user_id = user.id

  const [house, setHouse] = useState({
    name: "",
    address: "",
    user_id: user_id,
    district_id: "",
    ward_id: ""
  })

  useEffect(() => {
    dispatch(getDistrict())
  }, [])

  const handleDistrictChange = (e) => {
    const district_id = e.target.value;
    setHouse({ ...house, district_id, ward_id: "" })
    dispatch(getWard(district_id))
  }

  const handleChange = (e) => {
    setHouse({ ...house, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !house.name ||
      !house.address ||
      !house.district_id ||
      !house.ward_id
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin")
      return
    }
    try {
      const res = await dispatch(addHouse(house))
      if (res.payload.data.st) {
        toast.error(res.payload.data.st)

      } else {
        toast.success("Thêm nhà thành công");
        navigate(`/landlord/house-manager`)
      }
    } catch (error) {
      toast.error("Thêm phòng thất bại")
    }
  }

  return (
    <Common>
      <form className='add_house' onSubmit={handleSubmit}>
        <span className='add_house_title'>Thêm nhà</span>

        <div className='add_house_content'>
          <div className='add_house_content_ele'>
            <BaseInput name="name" placeholder="Tên nhà" onChange={handleChange} />
          </div>
          <div className='add_house_content_ele'>
            <select>
              <option value="">Hà Nội</option>
            </select>
          </div>

          <div className='add_house_content_ele'>
            <select name='district_id' onChange={handleDistrictChange}>
              <option value="">Chọn Quận / Huyện</option>
              {district.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>

          <div className='add_house_content_ele'>
            <select name='ward_id' onChange={handleChange}>
              <option value="">Chọn Phường / Xã</option>
              {ward.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>

          <div className='add_house_content_ele'>
            <BaseInput name="address" placeholder="Địa chỉ chi tiết" onChange={handleChange} />
          </div>

          <div className='add_house_content_ele'>
            <BaseButton type="blue">Thêm nhà</BaseButton>
          </div>
        </div>
      </form>
    </Common>
  )
}
