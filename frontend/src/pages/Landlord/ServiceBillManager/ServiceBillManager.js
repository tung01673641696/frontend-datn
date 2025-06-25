import React, { useEffect, useState } from 'react'
import './ServiceBillManager.scss'
import Common from '../../../layouts/LandlordLayout/Common/Common'
import { Table } from 'antd'
import Column from 'antd/es/table/Column'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DatePicker } from 'antd'
import { houseByOwner } from '../../../redux/reducers/house'
import { getRoomByHouse } from '../../../redux/reducers/room'
import { getAllServiceBill } from '../../../redux/reducers/bill'

import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import locale from 'antd/es/date-picker/locale/vi_VN'
dayjs.locale('vi')

export default function ServiceBillManager() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("user"))
  const id_user = user.id

  const [selectHouse, setSelectHouse] = useState("")
  const [selectRoom, setSelectRoom] = useState("")

  const { listHouseByOwner } = useSelector((state) => state.houseReducer)
  const { listRoomByHouse } = useSelector((state) => state.roomReducer)
  const { allServiceBill } = useSelector((state) => state.billReducer)

  console.log(">>>>>>>>>", allServiceBill)

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
    dispatch(getAllServiceBill({ house_id: selectHouse, room_id: selectRoom }))
  }, [])


  return (
    <Common>
      <h3 className='service_title'>Quản lý hóa đơn dịch vụ</h3>

      <div className='service_select'>
        <select value={selectHouse} onChange={handleHouseChange}>
          <option value="" disabled>Tất cả nhà</option>
          {listHouseByOwner.map(item => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>

        <select
          value={selectRoom}
          onChange={(e) => setSelectRoom(Number(e.target.value))}
        >
          <option value="">Tất cả phòng</option>
          {listRoomByHouse.map(item => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>

        <DatePicker
          picker="month"
          disabledDate={(current) => current && current < dayjs().startOf('month')}
          format="MM/YYYY"
          locale={locale}
          placeholder="Chọn tháng/năm"
        />

        <select>
          <option value="">Tình trạng</option>
          <option value="">Chưa thanh toán</option>
          <option value="">Đã thanh toán</option>
        </select>
      </div>

      <Table style={{ textAlignLast: 'center' }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
          pageSizeOptions: ['10', '20', '30'],
        }}
        dataSource={allServiceBill}
        bordered
      >
        <Column title={"STT"} render={(_, __, index) => index + 1} key="id" />
        <Column title={"Nhà"}
          render={(item) => (
            <span>{item?.house_name}</span>
          )}
        />

        <Column title={"Phòng"}
          render={(item) => (
            <span>{item?.room_name}</span>
          )}
        />

        <Column title={"Khách thuê"}
          render={(item) => (
            <span>{item?.tenant_name}</span>
          )}
        />

        <Column title={"Tháng / năm"}
          render={(item) => (
            <span>{item?.billing_date}</span>
          )}
        />

        <Column title={"Tiền dịch vụ"}
          render={(item) => (
            <span>{item?.total_amount}</span>
          )}
        />
      </Table>
    </Common>
  )
}
