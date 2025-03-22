import React from 'react'
import "./VehicleManager.scss"
import Common from '../../../layouts/LandlordLayout/Common/Common'
import BaseButton from '../../../components/BaseButton/BaseButton'
import { Table } from 'antd'
import Column from 'antd/es/table/Column'
import { useNavigate } from 'react-router-dom'

export default function VehicleManager() {
  const navigate = useNavigate()

  const data = [
    {
      id: 1,
      house: "Gohomy1",
      room: "101",
      tenant: "Hoàng Thanh Tùng",
      type_vehicle: 'Xe máy',
      vehicle_number: '34M9-6705'
    },
    {
      id: 2,
      house: "Gohomy1",
      room: "102",
      tenant: "Nguyễn Văn Toàn",
      type_vehicle: 'Xe máy',
      vehicle_number: '34M9-4422'
    },
  ]

  function handleClick() {
    navigate(`/landlord/vehicle-manager/add-vehicle`)
  }

  return (
    <Common>
      <h3>Danh sách phương tiện</h3>

      <div className='select'>
        <div className='select_search'>
          <span className='select_search_title'>Nhà</span>
          <select>
            <option>Tất cả nhà</option>
            <option>Nhà Gohomy1</option>
            <option>Nhà Gohomy2</option>
          </select>
        </div>

        <div className='select_add'>
          <BaseButton type="blue" onClick={handleClick}>Thêm phương tiện</BaseButton>
        </div>
      </div>

      <Table style={{ textAlignLast: 'center' }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
          pageSizeOptions: ['10', '20', '30'],
        }}
        dataSource={data}
        bordered
      >
        <Column title={"STT"} dataIndex="id" key="id" />
        <Column title={"Nhà"}
          render={(item) => (
            <span>{item?.house}</span>
          )}
        />

        <Column title={"Phòng"}
          render={(value) => (
            <span>{value?.room}</span>
          )}
        />

        <Column title={"Người thuê"}
          render={(value) => (
            <span>{value?.tenant}</span>
          )}
        />

        <Column title={"Loại xe"}
          render={(value) => (
            <span>{value?.type_vehicle}</span>
          )}
        />

        <Column title={"Biển số xe"}
          render={(value) => (
            <span>{value?.vehicle_number}</span>
          )}
        />

        <Column title={"Thao tác"}
          render={() => (
            <>
              <BaseButton type="warning">Sửa</BaseButton>
              <BaseButton type="red">Xóa</BaseButton>
            </>
          )}
        />
      </Table>

    </Common>
  )
}
