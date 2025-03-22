import React, { useEffect } from 'react'
import './HouseManager.scss'
import Common from '../../../layouts/LandlordLayout/Common/Common'
import BaseButton from '../../../components/BaseButton/BaseButton'
import { Table } from 'antd'
import Column from 'antd/es/table/Column'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { houseByOwner } from '../../../redux/reducers/house'

export default function HouseManager() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))
  const id = user.id

  const dispatch = useDispatch()
  const { listHouseByOwner } = useSelector((state) => state.houseReducer)
  console.log("list", listHouseByOwner)

  function handleClick() {
    navigate(`/landlord/house-manager/add-house`)
  }

  useEffect(() => {
    dispatch(houseByOwner(id));
  }, [dispatch, id]);

  return (
    <Common>
      <h3 className='house_mana_title'>Danh sách nhà</h3>

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
        <Column title={"STT"} dataIndex="id" key="id" />
        <Column title={"Tên nhà"}
          render={(item) => (
            <span>{item?.name}</span>
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
            <span>{value?.address},{value?.ward?.name},{value?.district?.name}</span>
          )}
        />

        <Column title={"Thao tác"}
          render={(item) => (
            <>
              <BaseButton type="warning" onClick={() => navigate(`/landlord/house-manager/edit-house/${item.id}`)}>Sửa</BaseButton>
              <BaseButton type="red">Xóa</BaseButton>
            </>
          )}
        />
      </Table>
    </Common>
  )
}
