import React, { useEffect, useState } from 'react'
import "./EditVehicle.scss"
import Common from '../../../../layouts/LandlordLayout/Common/Common'
import BaseInput from '../../../../components/BaseInput/BaseInput'
import BaseButton from '../../../../components/BaseButton/BaseButton'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getOneVehicle } from '../../../../redux/reducers/vehicle'
import { houseByOwner } from '../../../../redux/reducers/house'
import { getRoomByHouse } from '../../../../redux/reducers/room'
import { getTenantByRoom } from '../../../../redux/reducers/tenant'
import { editVehicle } from '../../../../redux/reducers/vehicle'

export default function EditVehicle() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("user"))
  const id_user = user.id
  const params = useParams()
  const vehicle_id = params.id
  const [selectHouse, setSelectHouse] = useState("")
  const [selectRoom, setSelectRoom] = useState("")

  const [vehicle, setVehicle] = useState({
    tenant_id: "",
    tenant_name: "",
    type_vehicle: "",
    license_plate: "",
    description: "",
    room_id: "",
    room_name: "",
    house_id: "",
    house_name: ""
  })

  const { oneVehicle } = useSelector((state) => state.vehicleReducer)

  useEffect(() => {
    dispatch(getOneVehicle(vehicle_id))
  }, [])

  useEffect(() => {
    if (oneVehicle) {
      setVehicle({
        tenant_id: oneVehicle?.tenant_id || "",
        tenant_name: oneVehicle?.tenant_name || "",
        type_vehicle: oneVehicle?.type_vehicle || "",
        license_plate: oneVehicle?.license_plate || "",
        description: oneVehicle?.description || "",
        room_id: oneVehicle?.room_id || "",
        room_name: oneVehicle?.room_name || "",
        house_id: oneVehicle?.house_id || "",
        house_name: oneVehicle?.house_name || ""
      });
    }

    if (oneVehicle?.house_id) {
      dispatch(getRoomByHouse(oneVehicle.house_id));
      setSelectHouse(oneVehicle.house_id);
    }

    if (oneVehicle?.room_id) {
      dispatch(getTenantByRoom(oneVehicle.room_id));
      setSelectRoom(oneVehicle.room_id);
    }
  }, [oneVehicle]);

  const { listHouseByOwner } = useSelector((state) => state.houseReducer)
  const { listRoomByHouse } = useSelector((state) => state.roomReducer)
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

    const data = {
      tenant_id: vehicle.tenant_id,
      type_vehicle: vehicle.type_vehicle,
      license_plate: vehicle.license_plate,
      description: vehicle.description,
    }

    console.log("data", data)
    dispatch(editVehicle({ vehicleId: vehicle_id, data: data }))
    navigate(`/landlord/vehicle-manager`)
  }

  return (
    <Common>
      <form className='edit_vehicle' onSubmit={handleSubmit}>
        <span className='edit_vehicle_title'>Cập nhật phương tiện</span>

        <div className='edit_vehicle_box'>
          <div className='edit_vehicle_box_child'>
            <div className='edit_vehicle_box_child_ele'>
              <select value={vehicle.house_id} onChange={handleHouseChange} className='edit_vehicle_box_child_select'>
                <option value="" disabled>Chọn nhà</option>
                {listHouseByOwner.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>

            <div className='edit_vehicle_box_child_ele'>
              <select value={vehicle.room_id} onChange={handleRoomChange} className='edit_vehicle_box_child_select'>
                <option value="" disabled>Chọn phòng</option>
                {listRoomByHouse.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className='edit_vehicle_box_child'>
            <div className='edit_vehicle_box_child_ele'>
              <select name="tenant_id" value={vehicle.tenant_id} onChange={handleChange} required className='edit_vehicle_box_child_select'>
                <option value="" disabled>Chọn khách thuê</option>
                {listTenantByRoom.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>

            <div className='edit_vehicle_box_child_ele'>
              <select name='type_vehicle' value={vehicle.type_vehicle} onChange={handleChange} required className='edit_vehicle_box_child_select'>
                <option value="" disabled>Loại xe</option>
                <option value="Xe đạp">Xe đạp</option>
                <option value="Xe máy">Xe máy</option>
              </select>
            </div>
          </div>

          <div className='edit_vehicle_box_child'>
            <BaseInput name="license_plate" value={vehicle.license_plate} onChange={handleChange} placeholder="Biển số xe" />
          </div>

          <div className='edit_vehicle_box_child'>
            <textarea
              name="description"
              value={vehicle.description}
              onChange={handleChange}
              placeholder="Mô tả chi tiết"
            />
          </div>

          <div className='edit_vehicle_button'>
            <BaseButton type="blue">Cập nhật phương tiện</BaseButton>
          </div>
        </div>
      </form>
    </Common>
  )
}
