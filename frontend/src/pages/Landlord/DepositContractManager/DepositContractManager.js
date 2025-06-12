import React, { useState, useEffect } from 'react'
import './DepositContractManager.scss'
import Common from '../../../layouts/LandlordLayout/Common/Common'
import { Table } from 'antd'
import Column from 'antd/es/table/Column'
import BaseButton from '../../../components/BaseButton/BaseButton'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import BaseModal from '../../../components/BaseModal/BaseModal'
import { landlordGetAllDepositContract } from '../../../redux/reducers/contract'

export default function DepositContractManager() {
  const user = JSON.parse(localStorage.getItem("user"))
  const id = user.id
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { allDepositContract } = useSelector((state) => state.contractReducer)
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    dispatch(landlordGetAllDepositContract(id));
  }, []);

  const filteredContracts = selectedStatus
    ? allDepositContract.filter(contract => contract.status === selectedStatus)
    : allDepositContract;

  return (
    <Common>
      <h3 className='deposit_contract_mana_title'>Quản lý hợp đồng cọc</h3>


      <div className='deposit_contract_mana'>
        <div className='deposit_contract_mana_select'>
          <span className='deposit_contract_mana_select_title'>Chọn trạng thái hợp đồng cọc</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">Tất cả</option>
            <option value="pending">Chờ xác nhận</option>
            <option value="signed">Đã cọc</option>
            <option value="cancelled">Từ chối</option>
          </select>

        </div>

        <Table style={{ textAlignLast: 'center' }}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: false,
            pageSizeOptions: ['10', '20', '30'],
          }}
          dataSource={filteredContracts}
          bordered
        >
          <Column title={"STT"} render={(_, __, index) => index + 1} key="id" />
          <Column title={"Tên nhà"}
            render={(item) => (
              <span>{item?.house?.name}</span>
            )}
          />

          <Column title={"Tên phòng"}
            render={(item) => (
              <span>{item?.room?.name}</span>
            )}
          />

          <Column title={"Người kí HĐ cọc"}
            render={(item) => (
              <span>{item?.renter?.name}</span>
            )}
          />

          <Column title={"Số điện thoại"}
            render={(item) => (
              <span>{item?.renter?.phone}</span>
            )}
          />

          <Column title={"Giá thuê"}
            render={(item) => (
              <span>{item.room.price ? `${Number(item.room.price).toLocaleString('vi-VN')}đ` : "Đang cập nhật"}</span>
            )}
          />

          <Column title={"Đặt cọc"}
            render={(item) => (
              <span>{item.room.price_deposit ? `${Number(item.room.price_deposit).toLocaleString('vi-VN')}đ` : "Đang cập nhật"}</span>
            )}
          />
          <Column title={"Ngày khách vào ở"}
            render={(item) => (
              <span>{item?.start_date}</span>
            )}
          />

          <Column title={"Trạng thái"}
            render={(item) => (
              <span>{item?.status === 'pending' ? 'đang chờ duyệt' :
                item?.status === 'signed' ? 'đã cọc' : 'đã từ chối'
              }
              </span>
            )}
          />

        </Table>
      </div>
    </Common>
  )
}
