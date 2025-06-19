import React, { useEffect, useState } from 'react'
import "./TenantManager.scss"
import Common from '../../../layouts/LandlordLayout/Common/Common'
import BaseButton from '../../../components/BaseButton/BaseButton'
import { Table } from 'antd'
import Column from 'antd/es/table/Column'
import { useNavigate } from 'react-router-dom'
import { houseByOwner } from '../../../redux/reducers/house'
import { useDispatch, useSelector } from 'react-redux'
import { getRoomByHouse } from '../../../redux/reducers/room'
import { deleteTenant, getAllTenant } from '../../../redux/reducers/tenant'
import BaseModal from '../../../components/BaseModal/BaseModal'

export default function TenantManager() {
  const [isShow, setIsShow] = useState(false)
  const [tenantId, setTenantId] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("user"))
  const id_user = user.id
  const { listHouseByOwner } = useSelector((state) => state.houseReducer)
  const [selectHouse, setSelectHouse] = useState("")
  const [selectRoom, setSelectRoom] = useState("")
  const { listRoomByHouse } = useSelector((state) => state.roomReducer)
  const { allTenant } = useSelector((state) => state.tenantReducer)

  useEffect(() => {
    dispatch(houseByOwner(id_user))
  }, [id_user])

  const handleHouseChange = (e) => {
    const houseId = Number(e.target.value);
    setSelectHouse(houseId)
    setSelectRoom("")
    if (houseId) {
      dispatch(getRoomByHouse(houseId))
    }
  }

  useEffect(() => {
    dispatch(getAllTenant())
  }, [])

  function handleClick() {
    navigate(`/landlord/tenant-manager/add-tenant`);
  }

  const handleShow = (tenantId) => {
    setTenantId(tenantId)
    setIsShow(true)
  }

  function handleClose() {
    setIsShow(false)
  }

  const handleDelete = async () => {
    if (tenantId) {
      await dispatch(deleteTenant(tenantId));
      setIsShow(false);
    }
  };

  const filteredTenant = allTenant.filter(item => {
    const matchHouse = selectHouse ? Number(item.house_id) === Number(selectHouse) : true;
    const matchRoom = selectRoom ? Number(item.room_id) === Number(selectRoom) : true;
    return matchHouse && matchRoom;
  });

  return (
    <Common>
      <h3 className='tenant-mana_title'>Danh sách khách thuê</h3>

      <>
        <BaseModal
          open={isShow}
          title="Xóa nhà"
          type="red"
          content="Bạn có chắc chắn muốn xóa khách hàng không ?"
          onCancel={handleClose}
          onConfirm={handleDelete}
        />
      </>

      <div className='tenant-mana_act'>
        <div className='tenant-mana_act_search'>
          <div className='tenant-mana_act_search_ele'>
            <span className='tenant-mana_act_search_ele_name'>Nhà</span>
            <select value={selectHouse} onChange={handleHouseChange} className='tenant-mana_act_search_ele_select'>
              <option value="" disabled>Tất cả nhà</option>
              {listHouseByOwner.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>

          <div className='tenant-mana_act_search_ele'>
            <span className='tenant-mana_act_search_ele_name'>Phòng</span>
            <select
              className='tenant-mana_act_search_ele_select'
              value={selectRoom}
              onChange={(e) => setSelectRoom(Number(e.target.value))}
            >
              <option value="">Tất cả phòng</option>
              {listRoomByHouse.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
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
        dataSource={filteredTenant}
        bordered
      >
        <Column title={"STT"} render={(_, __, index) => <span>{index + 1}</span>} key="id" />
        <Column title={"Tên khách thuê"}
          render={(item) => (
            <span>{item?.tenant?.name}</span>
          )}
        />

        <Column title={"Số điện thoại"}
          render={(value) => (
            <span>{value?.tenant?.phone}</span>
          )}
        />

        <Column title={"Nhà"}
          render={(value) => (
            <span>{value?.house_name}</span>
          )}
        />

        <Column title={"Phòng"}
          render={(value) => (
            <span>{value?.room_name}</span>
          )}
        />

        <Column title={"phân quyền"}
          render={(value) => (
            <span>Người đại diện hợp đồng</span>
          )}
        />

        <Column title={"Thao tác"}
          render={(value) => (
            <>
              <BaseButton type="warning" onClick={() => navigate(`/landlord/tenant-manager/edit-tenant/tenant_id/${value.tenant.id}`)}>Sửa</BaseButton>
              <BaseButton type="red" onClick={() => handleShow(value.tenant.id)}>Xóa</BaseButton>
            </>
          )}
        />
      </Table>

    </Common>
  )
}
