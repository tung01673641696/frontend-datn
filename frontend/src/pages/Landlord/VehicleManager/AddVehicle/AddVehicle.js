import React, { useEffect, useState } from 'react'
import "./AddVehicle.scss"
import Common from '../../../../layouts/LandlordLayout/Common/Common'
import BaseInput from '../../../../components/BaseInput/BaseInput'
import BaseButton from '../../../../components/BaseButton/BaseButton'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { houseByOwner } from '../../../../redux/reducers/house'
import { getRoomByHouse } from '../../../../redux/reducers/room'
import { getTenantByRoom } from '../../../../redux/reducers/tenant'
import { addVehicle } from '../../../../redux/reducers/vehicle'

export default function AddVehicle() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("user"))
  const id_user = user.id

  const [vehicle, setVehicle] = useState({
    tenant_id: "",
    type_vehicle: "",
    license_plate: "",
    description: "",
  })

  const { listHouseByOwner } = useSelector((state) => state.houseReducer)
  const [selectHouse, setSelectHouse] = useState("")

  const { listRoomByHouse } = useSelector((state) => state.roomReducer)
  const [selectRoom, setSelectRoom] = useState("")

  const { listTenantByRoom } = useSelector((state) => state.tenantReducer)

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

  const handleRoomChange = (e) => {
    const roomId = e.target.value
    setSelectRoom(roomId)

    if (roomId) {
      dispatch(getTenantByRoom(roomId))
    }
  }

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      !vehicle.tenant_id ||
      !vehicle.type_vehicle
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin")
    } else {
      try {
        const res = await dispatch(addVehicle(vehicle))
        if (res.payload.data.message) {
          toast.success(res.payload.data.message)
        }
      } catch (error) {
        console.log(error)
      }
      navigate(`/landlord/vehicle-manager`)
    }
  }


  return (
    <Common>
      <form className='add_vehicle' onSubmit={handleSubmit}>
        <span className='add_vehicle_title'>Thêm phương tiện</span>

        <div className='add_vehicle_box'>
          <div className='add_vehicle_box_child'>
            <div className='add_vehicle_box_child_ele'>
              <select value={selectHouse} onChange={handleHouseChange} className='add_vehicle_box_child_select'>
                <option value="" disabled>Chọn nhà</option>
                {listHouseByOwner.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>

            <div className='add_vehicle_box_child_ele'>
              <select value={selectRoom} onChange={handleRoomChange} className='add_vehicle_box_child_select'>
                <option value="" disabled>Chọn phòng</option>
                {listRoomByHouse.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className='add_vehicle_box_child'>
            <div className='add_vehicle_box_child_ele'>
              <select name="tenant_id" value={vehicle.tenant_id} onChange={handleChange} required className='add_vehicle_box_child_select'>
                <option value="" disabled>Chọn khách thuê</option>
                {listTenantByRoom.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>

            <div className='add_vehicle_box_child_ele'>
              <select name='type_vehicle' value={vehicle.type_vehicle} onChange={handleChange} required className='add_vehicle_box_child_select'>
                <option value="" disabled>Loại xe</option>
                <option value="Xe đạp">Xe đạp</option>
                <option value="Xe máy">Xe máy</option>
              </select>
            </div>
          </div>

          <div className='add_vehicle_box_child'>
            <BaseInput name="license_plate" onChange={handleChange} placeholder="Biển số xe" />
          </div>

          <div className='add_vehicle_box_child'>
            <textarea
              name="description"
              onChange={handleChange}
              placeholder="Mô tả chi tiết"
            />
          </div>

          <div className='add_vehicle_button'>
            <BaseButton type="blue">Thêm phương tiện</BaseButton>
          </div>
        </div>
      </form>
    </Common>
  )
}
