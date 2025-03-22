import React from 'react'
import "./RoomManager.scss"
import Common from '../../../layouts/LandlordLayout/Common/Common'
import BaseButton from '../../../components/BaseButton/BaseButton'
import { Table } from 'antd'
import Column from 'antd/es/table/Column'
import { useNavigate } from 'react-router-dom'

export default function RoomManager() {
  const navigate = useNavigate()
  const room = [
    {
      id: 1,
      name: "101",
      type_room: "Chung cư mini",
      floor: 1,
      price: "4.000.000đ",
      area: "35",
      number_people: "4",
      number_people_sp: "2",
      status: "đã thuê"
    },
    {
      id: 2,
      name: "102",
      type_room: "Chung cư mini",
      floor: 1,
      price: "4.000.000đ",
      area: "35",
      number_people: "4",
      number_people_sp: "4",
      status: "đã thuê"
    },
    {
      id: 3,
      name: "201",
      type_room: "Chung cư mini",
      floor: 2,
      price: "4.000.000đ",
      area: "35",
      number_people: "4",
      number_people_sp: "4",
      status: "đã thuê"
    },
    {
      id: 4,
      name: "202",
      type_room: "Chung cư mini",
      floor: 2,
      price: "4.000.000đ",
      area: "35",
      number_people: "4",
      number_people_sp: "0",
      status: "Đang trống"
    }
  ]

  function handleClick() {
    navigate(`/landlord/room-manager/add-room`)

  }

  return (
    <Common>
      <h3 className='room_mana_title'>Danh sách phòng</h3>

      <div className='room_mana'>
        <div className='room_mana_add'>
          <BaseButton type="blue" onClick={handleClick}>Thêm phòng</BaseButton>
        </div>

        <div className='room_mana_select'>
          <span className='room_mana_select_title'>Chọn nhà</span>
          <select>
            <option>Nhà Gohomy1</option>
            <option>Nhà Gohomy2</option>
          </select>
        </div>

        <div className='room_mana_status'>
          <div className='room_mana_status_item'>
            <input type='checkbox' />
            <span>Chỉ hiện phòng trống</span>
          </div>

          <div className='room_mana_status_item'>
            <input type='checkbox' />
            <span>Chỉ hiện phòng đang ở</span>
          </div>
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

          <Column title={"Loại phòng"}
            render={(item) => (
              <span>{item?.type_room}</span>
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
