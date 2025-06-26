import React, { useEffect, useState } from 'react'
import "./RoomManager.scss"
import Common from '../../../layouts/LandlordLayout/Common/Common'
import BaseButton from '../../../components/BaseButton/BaseButton'
import { useNavigate } from 'react-router-dom'
import { houseByOwner } from '../../../redux/reducers/house'
import { useDispatch, useSelector } from 'react-redux'
import { getRoomByHouse } from '../../../redux/reducers/room'
import BaseModal from '../../../components/BaseModal/BaseModal'
import { deleteRoom } from '../../../redux/reducers/room'
import { useParams } from 'react-router-dom'
import ListTenant from '../../../layouts/LandlordLayout/RoomManagerLayout/ListTenant/ListTenant'
import { getTenantByRoom } from '../../../redux/reducers/tenant'
import AddServiceBill from '../ServiceBillManager/AddServiceBill/AddServiceBill'
import DetailRentalContract from '../../Tenant/DetailRentalContract/DetailRentalContract'

export default function RoomManager() {
  const [isShow, setIsShow] = useState(false)
  const [showAddBill, setShowAddBill] = useState(false)
  const [showViewContract, setShowViewContract] = useState(false)

  const [selectedHouse, setSelectedHouse] = useState("")
  const [selectRoomId, setSelectRoomId] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { listHouseByOwner } = useSelector((state) => state.houseReducer)
  const { listRoomByHouse } = useSelector((state) => state.roomReducer)
  const user = JSON.parse(localStorage.getItem("user"))
  const id = user.id
  const { houseId } = useParams()


  const { listTenantByRoom } = useSelector((state) => state.tenantReducer)
  const [showListTenantModal, setShowListTenantModal] = useState(false);

  useEffect(() => {
    dispatch(houseByOwner(id))
  }, [])

  useEffect(() => {
    if (listHouseByOwner.length > 0) {
      if (houseId) {
        setSelectedHouse(houseId)
      } else {
        setSelectedHouse(listHouseByOwner[0].id)
      }
    }
  }, [listHouseByOwner, houseId]);

  useEffect(() => {
    if (selectedHouse) {
      dispatch(getRoomByHouse(selectedHouse))
    }
  }, [dispatch, selectedHouse]);

  function handleClick() {
    navigate(`/landlord/room-manager/add-room/house_id/${selectedHouse}`)
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

  const handleOpenListTenantModal = (roomId) => {
    setSelectRoomId(roomId);
    dispatch(getTenantByRoom(roomId))
    setShowListTenantModal(true);
  };

  const handleOpenAddBillModal = (roomId) => {
    setSelectRoomId(roomId);
    setShowAddBill(true)
  };

  const handleShowContract = (roomId) => {
    setSelectRoomId(roomId);
    setShowViewContract(true)
  };

  return (
    <Common>
      <h3 className='room_mana_title'>Danh sách phòng</h3>

      <>
        <BaseModal
          open={isShow}
          title="Xóa phòng"
          type="red"
          content="Bạn có chắc chắn muốn xóa phòng này không ?"
          onCancel={handleClose}
          onConfirm={handleDelete}
        />
      </>

      <div className='room_mana'>
        <div className='room_mana_select'>
          <div className='room_mana_select_left'>
            <span className='room_mana_select_left_title'>Chọn nhà</span>
            <select
              value={selectedHouse}
              onChange={(e) => setSelectedHouse(e.target.value)}
            >
              {listHouseByOwner?.map((item) => (
                <option key={item?.id} value={item?.id}>{item?.name}</option>
              ))}
            </select>
          </div>

          <div className='room_mana_select_right'>
            <BaseButton type="blue" onClick={handleClick}>Thêm phòng</BaseButton>
          </div>
        </div>

        <div className="room_mana_cards">
          {listRoomByHouse?.map((room, index) => (
            <div className='room_mana_card' key={room.id}>
              <div className={`room_mana_card_header 
                  ${room.status === 'available' ? 'room_available' :
                  room.status === 'reserved' ? 'room_reserved' :
                    'room_rented'}`}
              >
                <h4>
                  Phòng: {room.name} - {
                    room.status === "available" ? "Đang trống" :
                      room.status === "rented" ? "Đang ở" :
                        "Đang cọc"
                  }
                </h4>
                <div>
                  <BaseButton type="warning" onClick={() => navigate(`/landlord/room-manager/edit-room/room_id/${room.id}`)}>Cập nhật thông tin</BaseButton>
                  <BaseButton type="red" onClick={() => handleShow(room.id)}>Xóa phòng</BaseButton>
                </div>
              </div>

              <table className="room_mana_card_table">
                <tbody>
                  <tr>
                    <td className='room_mana_card_table_title'>Giá</td>
                    <td className='room_mana_card_table_title'>Diện tích</td>
                    <td className='room_mana_card_table_title'>Số người tối đa</td>
                    <td className='room_mana_card_table_title'>Số người ở hiện tại</td>
                    <td className='room_mana_card_table_title'>Hợp đồng đang có</td>
                    <td className='room_mana_card_table_title'>Ngày trống</td>
                  </tr>

                  <tr>
                    <td>{room.price}</td>
                    <td>{room.area}</td>
                    <td>{room.user_number}</td>
                    <td>{room.current_people || 0}</td>
                    <td>chưa có hợp đồng</td>
                    <td>30/5/2025</td>
                  </tr>
                </tbody>
              </table>

              <div className='room_mana_card_fun'>
                <BaseButton type="blue" onClick={() => navigate(`/landlord/room-manager/view-room/room_id/${room.id}`)}>Thông tin phòng</BaseButton>

                {room.status === "rented" ? (
                  <>
                    <BaseButton type="warning" onClick={() => handleOpenListTenantModal(room.id)}>Khách thuê</BaseButton>
                    <BaseButton type="green" onClick={() => handleShowContract(room.id)}>Xem hợp đồng</BaseButton>
                    <BaseButton type="red" onClick={() => handleOpenAddBillModal(room.id)}>Tạo hóa đơn dịch vụ</BaseButton>
                  </>
                ) : (
                  <BaseButton type="blue" onClick={() => navigate(`/landlord/create-contract/renter_id/room_id/${room.id}`)}>Tạo hợp đồng</BaseButton>
                )}
              </div>
            </div>
          ))}
        </div>

        <BaseModal
          open={showListTenantModal}
          type="blue"
          width="58%"
          title="Khách thuê của phòng"
          content={<ListTenant tenants={listTenantByRoom} roomId={selectRoomId} />}
          onCancel={() => setShowListTenantModal(false)}
        />

        <BaseModal
          open={showAddBill}
          type="blue"
          width="58%"
          title="Thêm hóa đơn dịch vụ"
          content={<AddServiceBill houseId={selectedHouse} roomId={selectRoomId} />}
          onCancel={() => setShowAddBill(false)}
        />

        <BaseModal
          open={showViewContract}
          type="blue"
          width="50%"
          title="Xem chi tiết hợp đồng thuê"
          content={<DetailRentalContract roomId={selectRoomId}/>}
          onCancel={() => setShowViewContract(false)}
        />
      </div>
    </Common>
  )
}
