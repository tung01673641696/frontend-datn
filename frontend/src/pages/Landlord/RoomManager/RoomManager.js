import React from 'react'
import "./RoomManager.scss"
import Common from '../../../layouts/LandlordLayout/Common/Common'
import BaseButton from '../../../components/BaseButton/BaseButton'
import { Table } from 'antd'
import Column from 'antd/es/table/Column'

export default function RoomManager() {
  const room = [
    {
      id: 1,
      name: "101",
      floor: 1,
      price: "4.000.000đ",
      area: "35",
      number_people: "4",
      number_people_sp: "2",
      status: "đã thuê"
    }
  ]

  return (
    <Common>
      <h3>Danh sách phòng</h3>

      <div className='room_mana'>
        <div className='room_mana_search'>
          <span className='room_mana_search_title'>Nhà</span>
          <select>
            <option>Tất cả nhà</option>
            <option>Nhà Gohomy1</option>
            <option>Nhà Gohomy2</option>
          </select>
        </div>

        <div className='room_mana_add'>
          <BaseButton type="blue">Thêm phòng</BaseButton>
        </div>

        <Table style={{ textAlignLast: 'center' }}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: false,
            pageSizeOptions: ['10', '20', '30'],
          }}
          dataSource={room}
          bordered
        >
          <Column title={"STT"} dataIndex="id" key="id" />
          <Column title={"Tên phòng"}
            render={(item) => (
              <span>{item?.name}</span>
            )}
          />

          <Column title={"Tầng"}
            render={(item) => (
              <span>{item?.floor}</span>
            )}
          />

          <Column title={"Giá phòng"}
            render={(value) => (
              <span>{value?.price}</span>
            )}
          />

          <Column title={"Diện tích"}
            render={(value) => (
              <span>{value?.area}</span>
            )}
          />

          <Column title={"Số người tối đa"}
            render={(value) => (
              <span>{value?.number_people}</span>
            )}
          />

          <Column title={"Số người hiện tại"}
            render={(value) => (
              <span>{value?.number_people_sp}</span>
            )}
          />

          <Column title={"Tình trạng phòng"}
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
      </div>
    </Common>
  )
}
