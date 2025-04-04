import React, { useEffect, useState } from 'react'
import "./AddTenant.scss"
import Common from '../../../../layouts/LandlordLayout/Common/Common'
import BaseInput from '../../../../components/BaseInput/BaseInput'
import BaseButton from '../../../../components/BaseButton/BaseButton'
import { useDispatch, useSelector } from 'react-redux'
import { addHouse } from '../../../../redux/reducers/house'
import { useNavigate } from 'react-router-dom'
import { houseByOwner } from '../../../../redux/reducers/house'
import { getRoomByHouse } from '../../../../redux/reducers/room'
import { addTenant } from '../../../../redux/reducers/tenant'
import { toast } from 'react-toastify'

export default function AddTenant() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [tenant, setTenant] = useState({
    name: "",
    phone: "",
    room_id: "",
    note: "",
  })

  const [selectHouse, setSelectHouse] = useState("")

  const user = JSON.parse(localStorage.getItem("user"))
  const id_user = user.id
  const { listHouseByOwner } = useSelector((state) => state.houseReducer)
  const { listRoomByHouse } = useSelector((state) => state.roomReducer)

  useEffect(() => {
    dispatch(houseByOwner(id_user))
  }, [id_user])

  const handleHouseChange = (e) => {
    const houseId = e.target.value
    setSelectHouse(houseId)

    if (houseId) {
      dispatch(getRoomByHouse(houseId))
    }
  }

  const handleChange = (e) => {
    setTenant({ ...tenant, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !tenant.name ||
      !tenant.phone ||
      !tenant.room_id
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin")
    } else {
      try {
        const res = await dispatch(addTenant(tenant))
        if (res.payload.data.message) {
          toast.success(res.payload.data.message)
        }
      } catch (error) {
        console.log(error)
      }

      navigate(`/landlord/tenant-manager`)
    }
  }

  return (
    <Common>
      <form className='add_tenant' onSubmit={handleSubmit}>
        <span className='add_tenant_title'>Thêm khách thuê</span>

        <div className='add_tenant_box'>
          <div className='add_tenant_box_child'>
            <div className='add_tenant_box_child_ele'>
              <select className='add_tenant_box_child_select' value={selectHouse} onChange={handleHouseChange}>
                <option value="" disabled>Chọn nhà</option>
                {listHouseByOwner.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>

            <div className='add_tenant_box_child_ele'>
              <select name="room_id" className='add_tenant_box_child_select' onChange={handleChange}>
                <option value="">Chọn phòng</option>
                {listRoomByHouse.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className='add_tenant_box_child'>
            <div className='add_tenant_box_child_ele'>
              <BaseInput name="name" placeholder="Họ và tên" onChange={handleChange} />
            </div>

            <div className='add_tenant_box_child_ele'>
              <BaseInput name="phone" placeholder="Số điện thoại" onChange={handleChange} />
            </div>
          </div>

          <div className='add_tenant_box_child'>
            <textarea
              name="note"
              onChange={handleChange}
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
