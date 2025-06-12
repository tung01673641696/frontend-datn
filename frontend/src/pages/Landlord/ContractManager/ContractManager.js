import React, { useState, useEffect } from 'react'
import './ContractManager.scss'
import Common from '../../../layouts/LandlordLayout/Common/Common'
import { Table } from 'antd'
import Column from 'antd/es/table/Column'
import BaseButton from '../../../components/BaseButton/BaseButton'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import BaseModal from '../../../components/BaseModal/BaseModal'
import { landlordGetAllContract } from '../../../redux/reducers/contract'

export default function ContractManager() {
  const user = JSON.parse(localStorage.getItem("user"))
  const id = user.id
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { allContract } = useSelector((state) => state.contractReducer)
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    dispatch(landlordGetAllContract(id));
  }, []);

  console.log(">>>>>>a", allContract)

  const filteredContracts = selectedStatus
    ? allContract.filter(contract => contract.status === selectedStatus)
    : allContract;

  return (
    <Common>
      <h3 className='contract_mana_title'>Quản lý hợp đồng thuê</h3>


      <div className='contract_mana'>
        <div className='contract_mana_select'>

          <span className='contract_mana_select_title'>Chọn trạng thái hợp đồng thuê</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">Tất cả</option>
            <option value="signed">Đang thuê</option>
            <option value="cancelled">Đã hết hạn</option>
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
              <span>{item?.tenant?.name}</span>
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
          <Column title={"Ngày bắt đầu"}
            render={(item) => (
              <span>{item?.start_date}</span>
            )}
          />

          <Column title={"Ngày kết thúc"}
            render={(item) => (
              <span>{item?.end_date}</span>
            )}
          />

          <Column title={"Trạng thái"}
            render={(item) => (
              <span>{item?.status === 'signed' ? 'Đang thuê' : 'đã hết hạn'}</span>
            )}
          />

          <Column title={"Hành động"}
            render={(item) => (
              <>
                <BaseButton type="blue">Xem</BaseButton>

              </>
            )}
          />
        </Table>
      </div>
    </Common>
  )
}
