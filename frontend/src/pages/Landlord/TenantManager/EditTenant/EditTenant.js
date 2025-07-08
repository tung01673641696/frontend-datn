import React, { useEffect, useState } from 'react'
import "./EditTenant.scss"
import Common from '../../../../layouts/LandlordLayout/Common/Common'
import BaseInput from '../../../../components/BaseInput/BaseInput'
import BaseButton from '../../../../components/BaseButton/BaseButton'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getOneTenant } from '../../../../redux/reducers/tenant'
import { houseByOwner } from '../../../../redux/reducers/house'
import { getRoomByHouse } from '../../../../redux/reducers/room'
import { editTenant } from '../../../../redux/reducers/tenant'

export default function EditTenant({ tenantId, onClose }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [tenant, setTenant] = useState({
    name: "",
    phone: "",
    room_id: "",
    note: "",
    house_id: ""
  })
  const [selectHouse, setSelectHouse] = useState("")
  const user = JSON.parse(localStorage.getItem("user"))
  const id_user = user.id

  const { oneTenant } = useSelector((state) => state.tenantReducer)
  const { listHouseByOwner } = useSelector((state) => state.houseReducer)
  const { listRoomByHouse } = useSelector((state) => state.roomReducer)
  console.log("one", oneTenant)

  useEffect(() => {
    if (tenantId) {
      dispatch(getOneTenant(tenantId));
    }
  }, [tenantId])

  useEffect(() => {
    if (oneTenant) {
      setTenant({
        name: oneTenant?.name || "",
        phone: oneTenant?.phone || "",
        room_id: oneTenant?.room_id || "",
        note: oneTenant?.note || "",
        house_id: oneTenant?.room?.house_id || ""
      });
    }
  }, [oneTenant]);

  useEffect(() => {
    dispatch(houseByOwner(id_user))
  }, [id_user])

  const handleHouseChange = (e) => {
    const house_id = e.target.value
    setSelectHouse(house_id)
    setTenant({ ...tenant, house_id, room_id: "" })

    if (house_id) {
      dispatch(getRoomByHouse(house_id))
    }
  }

  const handleChange = (e) => {
    setTenant({ ...tenant, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (tenant.house_id) {
      dispatch(getRoomByHouse(tenant.house_id))
    }
  }, [tenant.house_id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      name: tenant.name,
      phone: tenant.phone,
      room_id: tenant.room_id,
      note: tenant.note,
    }
    dispatch(editTenant({ tenantId: tenantId, data: data }))
    if (onClose) onClose();
  }

  return (
    <form className='edit_tenant' onSubmit={handleSubmit}>

      <div className='edit_tenant_box'>
        <div className='edit_tenant_box_child'>
          <div className='edit_tenant_box_child_ele'>
            <select value={tenant.house_id} onChange={handleHouseChange} className='edit_tenant_box_child_select'>
              <option value="" disabled>Chọn nhà</option>
              {listHouseByOwner.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>

          <div className='edit_tenant_box_child_ele'>
            <select value={tenant.room_id} onChange={handleChange} name="room_id" className='edit_tenant_box_child_select'>
              <option value="">Chọn phòng</option>
              {listRoomByHouse.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className='edit_tenant_box_child'>
          <div className='edit_tenant_box_child_ele'>
            <BaseInput value={tenant.name} onChange={handleChange} name="name" placeholder="Họ và tên" />
          </div>

          <div className='edit_tenant_box_child_ele'>
            <BaseInput value={tenant.phone} onChange={handleChange} name="phone" placeholder="Số điện thoại" />
          </div>
        </div>

        <div className='edit_tenant_box_child'>
          <textarea
            name="note"
            value={tenant.note}
            onChange={handleChange}
            placeholder="Ghi chú"
          />
        </div>

        <div className='edit_tenant_button'>
          <BaseButton type="blue">Cập nhật khách thuê</BaseButton>
        </div>
      </div>
    </form>

  )
}
