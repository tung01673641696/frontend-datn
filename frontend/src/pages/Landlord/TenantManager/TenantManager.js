import React from 'react'
import "./TenantManager.scss"
import Common from '../../../layouts/LandlordLayout/Common/Common'
import BaseButton from '../../../components/BaseButton/BaseButton'
import { Table } from 'antd'
import Column from 'antd/es/table/Column'

export default function TenantManager() {
  const data = [
    {
      id: 1,
      name: "Hoàng Thanh Tùng",
      telephone: "0373641696",
      house: "Gohomy1",
      room: '101',
      date: '27/2/2025',
      note: '',
      status: 'Đang ở'
    },
    {
      id: 2,
      name: "Hoàng Thanh Tùng",
      telephone: "0373641696",
      house: "Gohomy1",
      room: '101',
      date: '27/2/2025',
      note: '',
      status: 'Đang ở'
    }
  ]

  return (
    <Common>
      <h3>Danh sách khách thuê</h3>

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
          <BaseButton type="blue">Thêm khách thuê</BaseButton>
        </div>
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
        <Column title={"Tên khách"}
          render={(item) => (
            <span>{item?.name}</span>
          )}
        />

        <Column title={"Số điện thoại"}
          render={(value) => (
            <span>{value?.telephone}</span>
          )}
        />

        <Column title={"Nhà"}
          render={(value) => (
            <span>{value?.house}</span>
          )}
        />

        <Column title={"Phòng"}
          render={(value) => (
            <span>{value?.room}</span>
          )}
        />

        <Column title={"Ngày vào"}
          render={(value) => (
            <span>{value?.date}</span>
          )}
        />

        <Column title={"Ghi chú"}
          render={(value) => (
            <span>{value?.note}</span>
          )}
        />

        <Column title={"Tình trạng"}
          render={(value) => (
            <span>{value?.status}</span>
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
