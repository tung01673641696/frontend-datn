import React, { useEffect, useState } from 'react'
import "./VehicleManager.scss"
import Common from '../../../layouts/LandlordLayout/Common/Common'
import BaseButton from '../../../components/BaseButton/BaseButton'
import { Table } from 'antd'
import Column from 'antd/es/table/Column'
import { useNavigate } from 'react-router-dom'
import { getAllVehicle } from '../../../redux/reducers/vehicle'
import { useDispatch, useSelector } from 'react-redux'
import BaseModal from '../../../components/BaseModal/BaseModal'
import { deleteVehicle } from '../../../redux/reducers/vehicle'
import { houseByOwner } from '../../../redux/reducers/house'
import { getRoomByHouse } from '../../../redux/reducers/room'

export default function VehicleManager() {
  const user = JSON.parse(localStorage.getItem("user"))
  const id_user = user.id
  const [isShow, setIsShow] = useState(false)
  const [vehicleId, setVehicleId] = useState(null)
  const [selectHouse, setSelectHouse] = useState("")
  const [selectRoom, setSelectRoom] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { allVehicle } = useSelector((state) => state.vehicleReducer)
  const { listHouseByOwner } = useSelector((state) => state.houseReducer)
  const { listRoomByHouse } = useSelector((state) => state.roomReducer)

  useEffect(() => {
    dispatch(houseByOwner(id_user))
  }, [id_user])

  useEffect(() => {
    dispatch(getAllVehicle())
  }, [])

  function handleClick() {
    navigate(`/landlord/vehicle-manager/add-vehicle`)
  }

  const handleShow = (vehicleId) => {
    setVehicleId(vehicleId)
    setIsShow(true)
  }

  function handleClose() {
    setIsShow(false)
  }

  const handleDelete = async () => {
    if (vehicleId) {
      await dispatch(deleteVehicle(vehicleId));
      setIsShow(false);
    }
  };

  const handleHouseChange = (e) => {
    const houseId = Number(e.target.value);
    setSelectHouse(houseId)
    setSelectRoom("")
    if (houseId) {
      dispatch(getRoomByHouse(houseId))
    }
  }

  const filteredVehicle = allVehicle.filter(item => {
    const matchHouse = selectHouse ? Number(item.house_id) === Number(selectHouse) : true;
    const matchRoom = selectRoom ? Number(item.room_id) === Number(selectRoom) : true;
    return matchHouse && matchRoom;
  });

  return (
    <Common>
      <h3>Danh sách phương tiện</h3>

      <>
        <BaseModal
          open={isShow}
          title="Xóa phương tiện"
          type="red"
          content="Bạn có chắc chắn muốn xóa phương tiện không ?"
          onCancel={handleClose}
          onConfirm={handleDelete}
        />
      </>

      <div className='vehicle_search'>
        <div className='vehicle_search_left'>
          <div className='vehicle_search_left_content'>
            <span className='vehicle_search_left_content_title'>Nhà</span>
            <select value={selectHouse} onChange={handleHouseChange} className='vehicle_search_left_content_select'>
              <option value="" disabled>Tất cả nhà</option>
              {listHouseByOwner.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>

          <div className='vehicle_search_left_content'>
            <span className='vehicle_search_left_content_title'>Phòng</span>
            <select value={selectRoom} onChange={(e) => setSelectRoom(Number(e.target.value))} className='vehicle_search_left_content_select'>
              <option value="" disabled>Tất cả phòng</option>
              {listRoomByHouse.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className='vehicle_search_right'>
          <div className='vehicle_search_right_button'>
            <BaseButton type="blue" onClick={handleClick}>Thêm phương tiện</BaseButton>
          </div>
        </div>
      </div>

      <Table style={{ textAlignLast: 'center' }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
          pageSizeOptions: ['10', '20', '30'],
        }}
        dataSource={filteredVehicle}
        bordered
      >
        <Column title={"STT"} dataIndex="id" key="id" />
        <Column title={"Nhà"}
          render={(item) => (
            <span>{item?.house_name}</span>
          )}
        />

        <Column title={"Phòng"}
          render={(value) => (
            <span>{value?.room_name}</span>
          )}
        />

        <Column title={"Người thuê"}
          render={(value) => (
            <span>{value?.tenant_name}</span>
          )}
        />

        <Column title={"Loại xe"}
          render={(value) => (
            <span>{value?.type_vehicle}</span>
          )}
        />

        <Column title={"Biển số xe"}
          render={(value) => (
            <span>{value?.license_plate}</span>
          )}
        />

        <Column title={"Thao tác"}
          render={(item) => (
            <>
              <BaseButton type="warning" onClick={() => navigate(`/landlord/vehicle-manager/edit-vehicle/vehicle_id/${item.id}`)}>Sửa</BaseButton>
              <BaseButton type="red" onClick={() => handleShow(item.id)}>Xóa</BaseButton>
            </>
          )}
        />
      </Table>

    </Common>
  )
}
