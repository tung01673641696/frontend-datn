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
import { editHouse } from '../../../../redux/reducers/house'

export default function EditHouse() {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
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

  useEffect(() => {
    if (oneHouse) {
      setHouse({
        name: oneHouse?.name || "",
        address: oneHouse?.address || "",
        district_id: oneHouse?.district?.id || "",
        ward_id: oneHouse?.ward?.id || ""
      });
    }
  }, [oneHouse]);

  useEffect(() => {
    if (house.district_id) {
      dispatch(getWard(house.district_id));
    }
  }, [house.district_id, dispatch]);

  const handleDistrictChange = (e) => {
    const district_id = e.target.value;
    setHouse({ ...house, district_id, ward_id: "" })
    dispatch(getWard(district_id))
  }

  const handleChange = (e) => {
    setHouse({ ...house, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(editHouse({ houseId: params.id, data: house }))
    navigate(`/landlord/house-manager`)
  }

  return (
    <Common>
      <form onSubmit={handleSubmit}>
        <span>Cập nhật nhà</span>

        <div className='add_house_content'>
          <div className='add_house_content_ele'>
            <BaseInput name="name" value={house.name} placeholder="Tên nhà" onChange={handleChange} />
          </div>
          <div className='add_house_content_ele'>
            <select>
              <option value="">Hà Nội</option>
            </select>
          </div>

          <div className='add_house_content_ele'>
            <select name='district_id' value={house.district_id} onChange={handleDistrictChange}>
              <option>Chọn Quận / Huyện</option>
              {district.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>

          <div className='add_house_content_ele'>
            <select name='ward_id' value={house.ward_id} onChange={handleChange}>
              <option>Chọn Phường / Xã</option>
              {ward.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>

          <div className='add_house_content_ele'>
            <BaseInput name="address" value={house.address} placeholder="Địa chỉ chi tiết" onChange={handleChange} />
          </div>

          <div className='add_house_content_ele'>
            <BaseButton type="blue">Cập nhật nhà</BaseButton>
          </div>
        </div>
      </form>
    </Common>
  )
}
