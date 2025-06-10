import React from 'react'
import './DepositContractManager.scss'
import Common from '../../../layouts/LandlordLayout/Common/Common'
import { Table } from 'antd'
import Column from 'antd/es/table/Column'
import BaseButton from '../../../components/BaseButton/BaseButton'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import BaseModal from '../../../components/BaseModal/BaseModal'

export default function DepositContractManager() {
  const user = JSON.parse(localStorage.getItem("user"))
  const id = user.id
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const detail_contract = [
    {
      'id': 1,
      'name_house': 'Gohomy1',
      'name_room': '101',
      'name_people': 'Nguyễn Ngọc Giỏi',
      'price': '4.500.000đ',
      'deposit_price': '4.500.000đ',
      'date': '20/06/2025',
      'status': 'Đang cọc'
    }
  ]

  return (
    <Common>
      <h3 className='deposit_contract_mana_title'>Danh sách hợp đồng cọc</h3>


      <div className='deposit_contract_mana'>
        <div className='deposit_contract_mana_select'>

          <span className='deposit_contract_mana_select_title'>Chọn trạng thái hợp đồng cọc</span>
          <select
          // value={selectedHouse}
          // onChange={(e) => setSelectedHouse(e.target.value)}
          >
            {/* {listHouseByOwner?.map((item) => (
                <option key={item?.id} value={item?.id}>{item?.name}</option>
              ))} */}
          </select>

        </div>

        <Table style={{ textAlignLast: 'center' }}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: false,
            pageSizeOptions: ['10', '20', '30'],
          }}
          dataSource={detail_contract}
          bordered
        >
          <Column title={"STT"} render={(_, __, index) => index + 1} key="id" />
          <Column title={"Tên nhà"}
            render={(item) => (
              <span>{item?.name_house}</span>
            )}
          />

          <Column title={"Tên phòng"}
            render={(item) => (
              <span>{item?.name_room}</span>
            )}
          />

          <Column title={"Người kí HĐ cọc"}
            render={(item) => (
              <span>{item?.name_people}</span>
            )}
          />

          <Column title={"Giá thuê"}
          render={(item) => (
            <span>{item?.price}</span>
          )}
          />

          <Column title={"Đặt cọc"}
          render={(item) => (
            <span>{item?.deposit_price}</span>
          )}
          />
          <Column title={"Ngày khách vào ở"}
          render={(item) => (
            <span>{item?.date}</span>
          )}
          />

          <Column title={"Trạng thái"}
          render={(item) => (
            <span>{item?.status}</span>
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
