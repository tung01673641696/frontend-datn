import React, { useEffect, useState } from 'react'
import './ServiceBillManager.scss'
import Common from '../../../layouts/LandlordLayout/Common/Common'
import { Table } from 'antd'
import Column from 'antd/es/table/Column'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import locale from 'antd/es/date-picker/locale/vi_VN'
dayjs.locale('vi')

export default function ServiceBillManager() {
  const [selectedMonth, setSelectedMonth] = useState(null)

  const handleChange = (date, dateString) => {
    setSelectedMonth(dateString) // VD: "06/2025"
    console.log("Chọn:", dateString)
  }

  const info = [
    {
      id: 1,
      house: 'Gohomy1',
      room: '101',
      tenant: 'Hoàng Thanh Tùng',
      price_house: '2.500.000',
      price_service: '1.500.000',
      total: '4.000.000'
    }
  ]


  return (
    <Common>
      <h3 className='service_title'>Quản lý hóa đơn dịch vụ</h3>

      <div className='service_select'>
        <select>
          <option>Tất cả nhà</option>
        </select>

        <select>
          <option>Tất cả phòng</option>
        </select>

        <DatePicker

          picker="month"
          format="MM/YYYY"
          locale={locale}
          placeholder="Chọn tháng/năm"
        />

        <select>
          <option>Tình trạng</option>
        </select>
      </div>

      <Table style={{ textAlignLast: 'center' }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
          pageSizeOptions: ['10', '20', '30'],
        }}
        dataSource={info}
        bordered
      >
        <Column title={"STT"} render={(_, __, index) => index + 1} key="id" />
        <Column title={"Nhà"}
          render={(item) => (
            <span>{item?.house}</span>
          )}
        />

        <Column title={"Phòng"}
          render={(item) => (
            <span className='link_page_room'>{item?.room}</span>
          )}
        />

        <Column title={"Khách thuê"}
          render={(item) => (
            <span>{item?.tenant}</span>
          )}
        />

        <Column title={"Tiền nhà"}
          render={(item) => (
            <span>{item?.price_house}</span>
          )}
        />

        <Column title={"Tiền dịch vụ"}
          render={(item) => (
            <span>{item?.price_service}</span>
          )}
        />

        <Column title={"Tổng tiền"}
          render={(item) => (
            <span>{item?.total}</span>
          )}
        />
      </Table>
    </Common>
  )
}
