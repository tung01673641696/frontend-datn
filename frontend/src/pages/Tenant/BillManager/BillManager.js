import React, { useEffect, useState } from 'react'
import './BillManager.scss'
import HeaderUser from '../../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../../layouts/UserLayout/FooterUser/FooterUser'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import BaseButton from '../../../components/BaseButton/BaseButton'
import BaseModal from '../../../components/BaseModal/BaseModal'
import ShowServiceBill from '../../Landlord/ServiceBillManager/ShowServiceBill/ShowServiceBill'
import { Table } from 'antd'
import Column from 'antd/es/table/Column'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import locale from 'antd/es/date-picker/locale/vi_VN'
import { getAllServiceBillByTenant } from '../../../redux/reducers/bill'
dayjs.locale('vi')

export default function BillManager() {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("user"))
  const id_tenant = user.id

  const { allServiceBillByTenant } = useSelector((state) => state.billReducer)

  console.log(">>>>>>>>", allServiceBillByTenant)
  const [selectedBillId, setSelectedBillId] = useState(null);
  const [showDetailServiceBill, setShowDetailServiceBill] = useState(false)

  useEffect(() => {
    dispatch(getAllServiceBillByTenant(id_tenant));
  }, []);

  function handleClose() {
    setShowDetailServiceBill(false)
  }
  return (
    <div className='bill_manager'>
      <HeaderUser />

      <div className='bill_manager_main'>
        <h3 className='bill_manager_main_title'>Xem hóa đơn dịch vụ</h3>

        <Table style={{ textAlignLast: 'center' }}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: false,
            pageSizeOptions: ['10', '20', '30'],
          }}
          dataSource={allServiceBillByTenant}
          bordered
        >
          <Column title={"Tháng"}
            render={(item) => (
              <span>{dayjs(item?.billing_date).format('M/YYYY')}</span>
            )}
          />

          <Column title={"Phòng"}
            render={(item) => (
              <span>{item?.room_name}</span>
            )}
          />

          <Column title={"Nhà"}
            render={(item) => (
              <span>{item?.house_name}</span>
            )}
          />

          <Column title={"Trạng thái"}
            render={(item) => (
              <>
                {item.status === 'unpaid' && (
                  <span style={{ color: 'red' }}>Chưa thanh toán</span>
                )}
                {item.status === 'paid' && (
                  <span style={{ color: 'green' }}>Đã thanh toán</span>
                )}
              </>
            )}
          />

          <Column title={"Hành động"}
            render={(item) => (
              <BaseButton
                type="blue"
                onClick={() => {
                  setSelectedBillId(item.id);
                  setShowDetailServiceBill(true);
                }}
              >
                Xem chi tiết
              </BaseButton>
            )}
          />
        </Table>

        <BaseModal
          open={showDetailServiceBill}
          title="Chi tiết hóa đơn dịch vụ"
          type="blue"
          width="50%"
          content={<ShowServiceBill billId={selectedBillId} />}
          onCancel={handleClose}
          showCancel={false}
          showConfirm={false}
        />
      </div>

      <Footer />
    </div>
  )
}
