import React from 'react'
import "./TenantManager.scss"
import Common from '../../../layouts/LandlordLayout/Common/Common'
import BaseButton from '../../../components/BaseButton/BaseButton'
import { Table } from 'antd'
import Column from 'antd/es/table/Column'
import { useNavigate } from 'react-router-dom'

export default function TenantManager() {
  const navigate = useNavigate()
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
      name: "Nguyễn Văn Lâm",
      telephone: "0373641698",
      house: "Gohomy1",
      room: '102',
      date: '27/2/2025',
      note: '',
      status: 'Đang ở'
    }
  ]

  function handleClick() {
    navigate(`/landlord/tenant-manager/add-tenant`);
  }

  return (
    <Common>
      <h3 className='tenant-mana_title'>Danh sách khách thuê</h3>

      <div className='tenant-mana_act'>
        <div className='tenant-mana_act_search'>
          <div className='tenant-mana_act_search_ele'>
            <span className='tenant-mana_act_search_ele_name'>Nhà</span>
            <select className='tenant-mana_act_search_ele_select'>
              <option>Nhà Gohomy1</option>
              <option>Nhà Gohomy2</option>
            </select>
          </div>

          <div className='tenant-mana_act_search_ele'>
            <span className='tenant-mana_act_search_ele_name'>Phòng</span>
            <select className='tenant-mana_act_search_ele_select'>
              <option>101</option>
              <option>102</option>
              <option>201</option>
              <option>202</option>
            </select>
          </div>
        </div>

        <div className='tenant-mana_act_add'>
          <BaseButton type="blue" onClick={handleClick}>Thêm khách thuê</BaseButton>
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
        <Column title={"Tên khách thuê"}
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
