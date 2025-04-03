import React, { useEffect } from 'react'
import "./TenantManager.scss"
import Common from '../../../layouts/LandlordLayout/Common/Common'
import BaseButton from '../../../components/BaseButton/BaseButton'
import { Table } from 'antd'
import Column from 'antd/es/table/Column'
import { useNavigate } from 'react-router-dom'
import { houseByOwner } from '../../../redux/reducers/house'
import { useDispatch, useSelector } from 'react-redux'

export default function TenantManager() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("user"))
  const id_user = user.id
  const { listHouseByOwner } = useSelector((state) => state.houseReducer)


  useEffect(() => {
    dispatch(houseByOwner(id_user))
  }, [id_user])

  console.log("sssss", listHouseByOwner)

  const data = [
    {
      id: 1,
      name: "Hoàng Thanh Tùng",
      telephone: "0373641696",
      house: "Gohomy1",
      room: '101',
      note: '',

    },
    {
      id: 2,
      name: "Nguyễn Văn Lâm",
      telephone: "0373641698",
      house: "Gohomy1",
      room: '102',
      note: '',

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
              {listHouseByOwner.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
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
