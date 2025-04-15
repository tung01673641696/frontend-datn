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

export default function VehicleManager() {
  const [isShow, setIsShow] = useState(false)
  const [vehicleId, setVehicleId] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { allVehicle } = useSelector((state) => state.vehicleReducer)

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
            <select className='vehicle_search_left_content_select'>
              <option>Tất cả nhà</option>
              <option>Nhà Gohomy1</option>
              <option>Nhà Gohomy2</option>
            </select>
          </div>

          <div className='vehicle_search_left_content'>
            <span className='vehicle_search_left_content_title'>Phòng</span>
            <select className='vehicle_search_left_content_select'>
              <option>Tất cả phòng</option>
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
        dataSource={allVehicle}
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
