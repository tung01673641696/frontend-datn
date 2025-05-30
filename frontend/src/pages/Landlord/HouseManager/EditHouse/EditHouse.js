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
import { toast } from 'react-toastify'

export default function EditHouse() {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { district, ward } = useSelector((state) => state.addressReducer)
  const { oneHouse } = useSelector((state) => state.houseReducer)

  console.log(">>>>>", oneHouse)

  const [house, setHouse] = useState({
    name: "",
    address: "",
    district_id: "",
    ward_id: "",
    electric_price: "",
    water_price: "",
    service_record_day: "",
    service_cal_day: ""
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
        ward_id: oneHouse?.ward?.id || "",
        electric_price: oneHouse?.electric_price || "",
        water_price: oneHouse?.water_price || "",
        service_record_day: oneHouse?.service_record_day || "",
        service_cal_day: oneHouse?.service_cal_day
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!house.name ||
      !house.address ||
      !house.district_id ||
      !house.ward_id ||
      !house.electric_price ||
      !house.water_price ||
      !house.service_record_day ||
      !house.service_cal_day
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      const res = await dispatch(editHouse({ houseId: params.id, data: house }))
      console.log("res", res)
      if (res.payload.data.error) {
        toast.error(res.payload.data.error)

      } else {
        toast.success("Cập nhật nhà thành công");
        navigate(`/landlord/house-manager`)
      }
    } catch (error) {
      toast.error("Cập nhật nhà thất bại")
    }
  }

  return (
    < Common >
      <form className='add_house' onSubmit={handleSubmit}>
        <span className='add_house_title'>Cập nhật nhà</span>

        <div className='add_house_content'>
          <div className='add_house_content_ele'>
            <div className='add_house_content_ele_child'>
              <div className='add_house_content_ele_child_title'>Tên nhà</div>
              <BaseInput name="name" value={house.name} onChange={handleChange} />
            </div>

            <div className='add_house_content_ele_child'>
              <div className='add_house_content_ele_child_title'>Địa chỉ chi tiết</div>
              <BaseInput name="address" value={house.address} onChange={handleChange} />
            </div>
          </div>

          <div className='add_house_content_ele'>
            <div className='add_house_content_ele_child1'>
              <div className='add_house_content_ele_child1_title'>Tỉnh / Tp</div>
              <select>
                <option value="">Hà Nội</option>
              </select>
            </div>

            <div className='add_house_content_ele_child1'>
              <div className='add_house_content_ele_child1_title'>Quận / Huyện</div>
              <select name='district_id' value={house.district_id} onChange={handleDistrictChange}>
                <option value="">Vui lòng chọn</option>
                {district.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>

            <div className='add_house_content_ele_child1'>
              <div className='add_house_content_ele_child1_title'>Phường / Xã</div>
              <select name='ward_id' value={house.ward_id} onChange={handleChange}>
                <option value="">Vui lòng chọn</option>
                {ward.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className='add_house_content_ele'>
            <div className='add_house_content_ele_child'>
              <div className='add_house_content_ele_child_title'>Tiền điện / 1 số</div>
              <BaseInput name="electric_price" type='number' value={house.electric_price} onChange={handleChange} />
            </div>
            <div className='add_house_content_ele_child'>
              <div className='add_house_content_ele_child_title'>Tiền nước / 1 khối</div>
              <BaseInput name="water_price" type='number' value={house.water_price} onChange={handleChange} />
            </div>
          </div>
          <div className='add_house_content_ele'>
            <div className='add_house_content_ele_child'>
              <div className='add_house_content_ele_child_title'>Ngày ghi số điện nước</div>
              <select name="service_record_day" value={house.service_record_day} onChange={handleChange}>
                <option value="">Vui lòng chọn</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
            <div className='add_house_content_ele_child'>
              <div className='add_house_content_ele_child_title'>Ngày chốt số điện nước</div>
              <select name="service_cal_day" value={house.service_cal_day} onChange={handleChange}>
                <option value="">Vui lòng chọn</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
          </div>

          <div className='add_house_content_ele1'>
            <BaseButton type="blue">Cập nhật nhà</BaseButton>
          </div>
        </div>
      </form >
    </Common >
  )
}
