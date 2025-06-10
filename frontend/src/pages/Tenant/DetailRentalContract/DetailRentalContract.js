import React, { useEffect, useState } from 'react'
import './DetailRentalContract.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import HeaderUser from '../../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../../layouts/UserLayout/FooterUser/FooterUser'
import BaseButton from '../../../components/BaseButton/BaseButton'
import BaseModal from '../../../components/BaseModal/BaseModal'

export default function DetailRentalContract() {
  const user = JSON.parse(localStorage.getItem('user'))
  const [openModal, setOpenModal] = useState(false)
  const [openModalConfirm, setOpenModalConfirm] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <div className='detail_rental_contract'>
      <HeaderUser />

      <div className='detail_rental_contract_box'>
        <h3>Hợp đồng thuê phòng</h3>

        <div className='detail_rental_contract_box_flex'>
          <div className='detail_rental_contract_box_flex_item'>
            <h4>Đại diện bên thuê</h4>
            <span>Họ và tên: Hoàng Thanh Tùng</span>
            <span>CMT / CCCD : 030099013846</span>
            <span>Số điện thoại: 0373641696</span>
          </div>

          <div className='detail_rental_contract_box_flex_item'>
            <h4>Đại diện bên chủ nhà</h4>
            <span>Họ và tên: Đỗ Văn Hiểu</span>
            <span>CMT / CCCD : 030099013846</span>
            <span>Số điện thoại: 0373641696</span>
          </div>
        </div>

        <div className='detail_rental_contract_box_flex'>
          <div className='detail_rental_contract_box_flex_item'>
            <h4>Thông tin phòng</h4>
            <span>Phòng 101 - Nhà Gohomy1</span>
            <span>Địa chỉ: 250 Kim Giang, Hoàng Mai, Hà Nội</span>
            <span>giá thuê: 2.500.000đ / tháng</span>
          </div>

          <div className='detail_rental_contract_box_flex_item'>
            <h4>Thời hạn hợp đồng</h4>
            <span>Thời hạn hợp đồng: 6 tháng</span>
            <span>Hợp đồng tính từ ngày: 10/6/2025</span>
            <span>Hợp đồng kết thúc ngày: 10/12/2025</span>
          </div>
        </div>

        <div className='detail_rental_contract_box_flex'>
          <div className='detail_rental_contract_box_flex_item'>
            <h4>Thông tin dịch vụ</h4>
            <span>Tiền điện: 4.000đ / 1 số</span>
            <span>Tiền nước: 30.000đ / 1 khối</span>
            <span>Dịch vụ chung: 100.000đ / người</span>
          </div>
        </div>

        <div className='detail_rental_contract_box_flex1'>
          <div className='detail_rental_contract_box_flex1_item'>
            <h4>* Điều khoản của bên A:</h4>
            <span>- Tạo mọi điều kiện thuận lợi để bên B thực hiện theo hợp đồng.</span>
            <span>- Bàn giao các trang thiết bị và cơ sở vật chất mới cho bên B sử dụng.</span>
          </div>

          <div className='detail_rental_contract_box_flex1_item'>
            <h4>* Điều khoản của bên B:</h4>
            <span>- Thanh toán đầy đủ các khoản tiền theo đúng thỏa thuận.</span>
            <span>- Bảo quản các trang thiết bị và cơ sở vật chất của bên A trang bị cho ban đầu.</span>
            <span>- Không được tự ý sửa chữa, cải tạo cơ sở vật chất khi chưa được sự đồng ý của bên A.</span>
            <span>- Bên B phải chấp hành mọi quy định của pháp luật Nhà nước và quy định của địa phương.</span>
          </div>

          <div className='detail_rental_contract_box_flex1_item'>
            <h4>* Điều khoản chung</h4>
            <span>- Trong thời gian hợp đồng còn hiệu lực nếu bên nào vi phạm các điều khoản đã thỏa thuận thì bên còn lại có quyền đơn phương chấm dứt hợp đồng.</span>
            <span>- Một trong hai bên muốn chấm dứt hợp đồng trước thời hạn thì phải báo trước cho bên kia ít nhất 30 ngày và hai bên phải có sự thống nhất.</span>
            <span>- Bên A phải trả lại tiền đặt cọc cho bên B.</span>
            <span>- Bên nào vi phạm điều khoản chung thì phải chịu trách nhiệm trước pháp luật.</span>
          </div>
        </div>

        <div className='detail_rental_contract_box_button'>
          {user?.role_id === 1 && (
            <div className='detail_deposit_contract_box_button'>
              <BaseButton type="blue" onClick={() => setOpenModalConfirm(true)}>Xác nhận</BaseButton>
              <BaseButton type="red" onClick={() => setOpenModal(true)}>Hủy hợp đồng thuê</BaseButton>
              <BaseButton onClick={() => navigate(-1)}>Quay lại</BaseButton>
            </div>
          )}

          {user?.role_id !== 1 && (
            <div className='detail_deposit_contract_box_button'>
              <BaseButton onClick={() => navigate(-1)}>Quay lại</BaseButton>
            </div>
          )}
        </div>

        <BaseModal
          open={openModal}
          type="red"
          title="Xác nhận hủy hợp đồng thuê phòng"
          content="Bạn có chắc chắn muốn hủy hợp đồng thuê phòng này không? Hành động này không thể hoàn tác."
        onCancel={() => setOpenModal(false)}
        // onConfirm={handleCancelContract}
        />


        <BaseModal
          open={openModalConfirm}
          type="red"
          title="Xác nhận hợp đồng thuê phòng"
          content="Bạn chắc chắn muốn xác nhận hợp đồng thuê phòng ?"
        onCancel={() => setOpenModalConfirm(false)}
        // onConfirm={handleConfirmContract}
        />
      </div>
      <Footer />
    </div >
  )
}
