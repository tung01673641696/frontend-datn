import React, { useEffect, useState } from 'react'
import "./AddTenant.scss"
import Common from '../../../../layouts/LandlordLayout/Common/Common'
import BaseInput from '../../../../components/BaseInput/BaseInput'
import BaseButton from '../../../../components/BaseButton/BaseButton'
import { useDispatch, useSelector } from 'react-redux'
import { addHouse } from '../../../../redux/reducers/house'
import { useNavigate } from 'react-router-dom'
import { addTenant } from '../../../../redux/reducers/tenant'
import { toast } from 'react-toastify'

export default function AddTenant({ roomId, onAddSuccess }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [tenant, setTenant] = useState({
    name: "",
    phone: "",
    identity_number: "",
    note: "",
  })

  useEffect(() => {
    setTenant(prev => ({ ...prev, room_id: roomId }))
  }, [roomId])

  const user = JSON.parse(localStorage.getItem("user"))
  const id_user = user.id

  const handleChange = (e) => {
    setTenant({ ...tenant, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      ...tenant,
      room_id: roomId
    }

    if (
      !payload.name ||
      !payload.phone ||
      !payload.identity_number
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin")
    } else {
      try {
        const res = await dispatch(addTenant(payload))
        if (res.payload?.data?.tenant) {
          toast.success("Thêm khách thuê thành công")
          onAddSuccess?.(res.payload.data.tenant)
        } else {
          toast.error("Thêm khách thuê thất bại")
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <form className='add_tenant' onSubmit={handleSubmit}>

      <div className='add_tenant_box'>

        <div className='add_tenant_box_child'>
          <BaseInput name="name" placeholder="Họ và tên" onChange={handleChange} />
        </div>

        <div className='add_tenant_box_child'>
          <BaseInput name="phone" placeholder="Số điện thoại" onChange={handleChange} />
        </div>

        <div className='add_tenant_box_child'>
          <BaseInput name="identity_number" placeholder="Căn cước công dân" onChange={handleChange} />
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
    </form >
  )
}
