import React from 'react'
import './HouseManager.scss'
import Common from '../../../layouts/LandlordLayout/Common/Common'
import BaseButton from '../../../components/BaseButton/BaseButton'
import { Table } from 'antd'
import Column from 'antd/es/table/Column'

export default function HouseManager() {
  const data = [
    {
      id: 1,
      name_house: "Gohomy1",
      room_number: "4",
      room_number_null: "0",
      address: 'Hà Nội',
    },
    {
      id: 2,
      name_house: "Gohomy1",
      room_number: "4",
      room_number_null: "0",
      address: 'Hà Nội',
    },
    {
      id: 3,
      name_house: "Gohomy1",
      room_number: "4",
      room_number_null: "0",
      address: 'Hà Nội',
    },
    {
      id: 4,
      name_house: "Gohomy1",
      room_number: "4",
      room_number_null: "0",
      address: 'Hà Nội',
    }
  ]

  return (
    <Common>
      <h3>Danh sách nhà</h3>

      <div className='add_house'>
        <BaseButton type="blue">Thêm nhà</BaseButton>
      </div>

      <Table style={{ textAlignLast: 'center' }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
          pageSizeOptions: ['10', '20', '30'],
        }}
        dataSource={data}
      >
        <Column title={"STT"} dataIndex="id" key="id" />
        <Column title={"Tên nhà"}
          render={(item) => (
            <span>{item?.name_house}</span>
          )}
        />

        <Column title={"Số phòng"}
          render={(value) => (
            <span>{value?.room_number}</span>
          )}
        />

        <Column title={"Số phòng trống"}
          render={(value) => (
            <span>{value?.room_number_null}</span>
          )}
        />

        <Column title={"Địa chỉ"}
          render={(value) => (
            <span>{value?.address}</span>
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
