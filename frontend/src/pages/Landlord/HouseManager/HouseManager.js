import React, { useEffect, useState } from 'react'
import './HouseManager.scss'
import Common from '../../../layouts/LandlordLayout/Common/Common'
import BaseButton from '../../../components/BaseButton/BaseButton'
import { Table } from 'antd'
import Column from 'antd/es/table/Column'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { houseByOwner } from '../../../redux/reducers/house'
import BaseModal from '../../../components/BaseModal/BaseModal'
import { deleteHouse } from '../../../redux/reducers/house'


export default function HouseManager() {
  const [isShow, setIsShow] = useState(false)
  const [selectHouseId, setSelectHouseId] = useState(null)
  const user = JSON.parse(localStorage.getItem("user"))
  const id = user.id

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { listHouseByOwner } = useSelector((state) => state.houseReducer)

  console.log(">>>>>>", listHouseByOwner)

  function handleClick() {
    navigate(`/landlord/house-manager/add-house`)
  }

  const handleShow = (houseId) => {
    setSelectHouseId(houseId)
    setIsShow(true)
  }

  function handleClose() {
    setIsShow(false)
  }

  useEffect(() => {
    dispatch(houseByOwner(id));
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (selectHouseId) {
      await dispatch(deleteHouse({ houseId: selectHouseId, id: id }));
      setIsShow(false);
    }
  };

  return (
    <Common>
      <h3 className='house_mana_title'>Danh sách nhà</h3>

      <>
        <BaseModal
          open={isShow}
          title="Xóa nhà"
          type="red"
          content="Bạn có chắc chắn muốn xóa nhà không ?"
          onCancel={handleClose}
          onConfirm={handleDelete}
        />
      </>

      <div className='house_mana_add'>
        <BaseButton type="blue" onClick={handleClick}>Thêm nhà</BaseButton>
      </div>

      <Table style={{ textAlignLast: 'center' }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
          pageSizeOptions: ['10', '20', '30'],
        }}
        dataSource={listHouseByOwner}
        bordered
      >
        <Column title={"STT"} render={(_, __, index) => index + 1} key="id" />
        <Column title={"Tên nhà"}
          render={(item) => (
            <span>{item?.name}</span>
          )}
        />

        <Column title={"Số phòng"}
          render={(item) => (
            <span className='link_page_room' onClick={() => navigate(`/landlord/room-manager/house_id/${item.id}`)}>{item?.room_number} phòng</span>
          )}
        />

        <Column title={"Số phòng trống"}
          render={(item) => (
            <span>{item?.room_number_null}</span>
          )}
        />

        <Column title={"Địa chỉ"}
          render={(item) => (
            <span>{item?.address},{item?.ward?.name},{item?.district?.name}</span>
          )}
        />

        <Column title={"Thao tác"}
          render={(item) => (
            <>
              <BaseButton type="warning" onClick={() => navigate(`/landlord/house-manager/edit-house/${item.id}`)}>Sửa</BaseButton>
              <BaseButton type="red" onClick={() => handleShow(item.id)}>Xóa</BaseButton>
            </>
          )}
        />
      </Table>
    </Common>
  )
}
