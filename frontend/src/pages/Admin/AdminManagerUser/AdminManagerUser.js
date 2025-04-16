import React, { useEffect, useState } from 'react'
import "./AdminManagerUser.scss"
import CommonAdmin from '../../../layouts/AdminLayout/CommonAdmin/CommonAdmin'
import { Table } from 'antd'
import Column from 'antd/es/table/Column'
import BaseButton from '../../../components/BaseButton/BaseButton'
import BaseModal from '../../../components/BaseModal/BaseModal'
import { getAllUser } from '../../../redux/reducers/user'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser } from '../../../redux/reducers/user'

export default function AdminManagerUser() {
  const [isShow, setIsShow] = useState(false)
  const [selectUserId, setSelectUserId] = useState(null)
  const [selectedRole, setSelectedRole] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { allUser } = useSelector((state) => state.userReducer)

  useEffect(() => {
    dispatch(getAllUser())
  }, [])

  const handleShow = (userId) => {
    setSelectUserId(userId)
    setIsShow(true)
  }

  function handleClose() {
    setIsShow(false)
  }

  const handleDelete = async () => {
    if (selectUserId) {
      await dispatch(deleteUser(selectUserId))
      setIsShow(false)
    }
  }

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value)
  }

  const filteredUsers = selectedRole
  ? allUser.filter(user => user.role === selectedRole)
  : allUser

  return (
    <CommonAdmin>
      <h3 className='ad_mana_user_title'>Quản Lý User</h3>

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

      <div className='ad_mana_user_action'>
        <div className='ad_mana_user_action_select'>
          <span className='ad_mana_user_action_select_title'>Chọn loại user</span>
          <select value={selectedRole} onChange={handleRoleChange}>
            <option value="" disabled>Chọn loại user</option>
            <option value="customer">Khách hàng</option>
            <option value="landlord">Chủ nhà</option>
          </select>
        </div>

        <Table style={{ textAlignLast: 'center' }}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: false,
            pageSizeOptions: ['10', '20', '30'],
          }}
          dataSource={filteredUsers}
          bordered
        >
          <Column title={"STT"} render={(_, __, index) => <span>{index + 1}</span>} key="id" />
          <Column title={"Họ tên"}
            render={(item) => (
              <span>{item?.name}</span>
            )}
          />

          <Column title={"Số điện thoại"}
            render={(item) => (
              <span>{item?.phone}</span>
            )}
          />

          <Column title={"Quyền sử dụng"}
            render={(item) => (
              <span>
                {item?.role === 'landlord' && 'Chủ nhà'}
                {item?.role === 'customer' && 'Khách hàng'}
              </span>
            )}
          />

          <Column title={"Thời gian đăng ký"}
            render={(value) => (
              <span>{value?.created_at}</span>
            )}
          />

          <Column title={"Thao tác"}
            render={(item) => (
              <BaseButton type="red" onClick={() => handleShow(item.id)}>Xóa</BaseButton>
            )}
          />
        </Table>
      </div>
    </CommonAdmin>
  )
}
