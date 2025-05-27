import React, { useEffect, useState } from 'react'
import "./RoomManager.scss"
import Common from '../../../layouts/LandlordLayout/Common/Common'
import BaseButton from '../../../components/BaseButton/BaseButton'
import { Table } from 'antd'
import Column from 'antd/es/table/Column'
import { useNavigate } from 'react-router-dom'
import { houseByOwner } from '../../../redux/reducers/house'
import { useDispatch, useSelector } from 'react-redux'
import { getRoomByHouse } from '../../../redux/reducers/room'
import BaseModal from '../../../components/BaseModal/BaseModal'
import { deleteRoom } from '../../../redux/reducers/room'

export default function RoomManager() {
  const [selectedHouse, setSelectedHouse] = useState("")
  const [isShow, setIsShow] = useState(false)
  const [selectRoomId, setSelectRoomId] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { listHouseByOwner } = useSelector((state) => state.houseReducer)
  const { listRoomByHouse } = useSelector((state) => state.roomReducer)
  const user = JSON.parse(localStorage.getItem("user"))
  const id = user.id

  console.log(">>>>>", listRoomByHouse)

  useEffect(() => {
    dispatch(houseByOwner(id))
  }, [])

  useEffect(() => {
    if (listHouseByOwner.length > 0) {
      setSelectedHouse(listHouseByOwner[0].id);
    }
  }, [listHouseByOwner]);

  useEffect(() => {
    if (selectedHouse) {
      dispatch(getRoomByHouse(selectedHouse))
    }
  }, [dispatch, selectedHouse]);

  function handleClick() {
    navigate(`/landlord/room-manager/add-room`)
  }

  const handleShow = (roomId) => {
    setSelectRoomId(roomId)
    setIsShow(true)
  }

  function handleClose() {
    setIsShow(false)
  }

  const handleDelete = async () => {
    if (selectRoomId) {
      await dispatch(deleteRoom({ roomId: selectRoomId, houseId: selectedHouse }))
      setIsShow(false)
    }
  }

  return (
    <Common>
      <h3 className='room_mana_title'>Danh sách phòng</h3>

      <>
        <BaseModal
          open={isShow}
          title="Xóa nhà"
          type="red"
          content="Bạn có chắc chắn muốn xóa phòng này không ?"
          onCancel={handleClose}
          onConfirm={handleDelete}
        />
      </>

      <div className='room_mana'>
        <div className='room_mana_add'>
          <BaseButton type="blue" onClick={handleClick}>Thêm phòng</BaseButton>
        </div>

        <div className='room_mana_select'>
          <span className='room_mana_select_title'>Chọn nhà</span>
          <select
            value={selectedHouse}
            onChange={(e) => setSelectedHouse(e.target.value)}
          >
            {listHouseByOwner?.map((item) => (
              <option key={item?.id} value={item?.id}>{item?.name}</option>
            ))}
          </select>
        </div>

        <Table style={{ textAlignLast: 'center' }}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: false,
            pageSizeOptions: ['10', '20', '30'],
          }}
          dataSource={listRoomByHouse}
          bordered
        >
          <Column title={"STT"} render={(_, __, index) => <span>{index + 1}</span>} key="id" />
          <Column title={"Tên phòng"}
            render={(item) => (
              <span>{item?.name}</span>
            )}
          />

          <Column title={"Loại phòng"}
            render={(item) => (
              <span>{item?.room_type}</span>
            )}
          />

          <Column title={"Tầng"}
            render={(item) => (
              <span>{item?.floor}</span>
            )}
          />

          <Column title={"Giá phòng"}
            render={(value) => (
              <span>{Number(value?.price).toLocaleString('vi-VN', { currency: 'VND' })}</span>
            )}
          />

          <Column title={"Diện tích"}
            render={(value) => (
              <span>{value?.area}</span>
            )}
          />

          <Column title={"Tình trạng phòng"}
            render={(value) => (
              value.is_available ? (
                <span style={{ color: "green" }}>Phòng đang trống</span>
              ) : (<span style={{ color: "red" }}>Phòng đã thuê</span>)
            )
            }
          />

          <Column title={"Thao tác"}
            render={(item) => (
              <>
                <BaseButton type="blue" onClick={() => navigate(`/landlord/room-manager/view-room/room_id/${item.id}`)}>Xem</BaseButton>
                <BaseButton type="warning" onClick={() => navigate(`/landlord/room-manager/edit-room/room_id/${item.id}`)}>Sửa</BaseButton>
                <BaseButton type="red" onClick={() => handleShow(item.id)}>Xóa</BaseButton>
              </>
            )}
          />
        </Table>
      </div>
    </Common>
  )
}
