import React, { useEffect, useState } from 'react'
import './DetailRentalContract.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import HeaderUser from '../../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../../layouts/UserLayout/FooterUser/FooterUser'
import BaseButton from '../../../components/BaseButton/BaseButton'
import BaseModal from '../../../components/BaseModal/BaseModal'
import { getRentalContractDetail } from '../../../redux/reducers/contract'

export default function DetailRentalContract({ roomId }) {
  const user = JSON.parse(localStorage.getItem('user'))
  const { rentalContractDetail } = useSelector((state) => state.contractReducer)
  const [openModal, setOpenModal] = useState(false)
  const [openModalConfirm, setOpenModalConfirm] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRentalContractDetail(roomId))
  }, [])

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className='detail_rental_contract'>
      <div className='detail_rental_contract_flex'>
        <div className='detail_rental_contract_flex_item'>
          <h4>Đại diện bên thuê</h4>
          <span>Họ và tên: {rentalContractDetail?.renter?.name}</span>
          <span>CMT / CCCD : {rentalContractDetail?.renter?.identity_number}</span>
          <span>Số điện thoại: {rentalContractDetail?.renter?.phone}</span>
        </div>

        <div className='detail_rental_contract_flex_item'>
          <h4>Đại diện bên chủ nhà</h4>
          <span>Họ và tên: {rentalContractDetail?.owner?.name}</span>
          <span>Số điện thoại: {rentalContractDetail?.owner?.phone}</span>
        </div>
      </div>

      <div className='detail_rental_contract_flex'>
        <div className='detail_rental_contract_flex_item'>
          <h4>Thông tin phòng</h4>
          <span>Phòng {rentalContractDetail?.room?.name} - Nhà {rentalContractDetail?.house?.name}</span>
          <span>Địa chỉ: {rentalContractDetail?.house?.address}</span>
          <span>giá thuê: {rentalContractDetail?.room?.price ? `${Number(rentalContractDetail.room.price).toLocaleString('vi-VN')}đ` : "Đang cập nhật"} / tháng</span>
        </div>

        <div className='detail_rental_contract_flex_item'>
          <h4>Thời hạn hợp đồng</h4>
          <span>Hợp đồng tính từ ngày: {formatDate(rentalContractDetail?.start_date)}</span>
          <span>Hợp đồng kết thúc ngày: {formatDate(rentalContractDetail?.end_date)}</span>
        </div>
      </div>

      <div className='detail_rental_contract_flex'>
        <div className='detail_rental_contract_flex_item'>
          <h4>Thông tin dịch vụ</h4>
          <span>Tiền điện: {rentalContractDetail?.house?.electric_price}đ / 1 số</span>
          <span>Tiền nước: {rentalContractDetail?.house?.water_price}đ / 1 khối</span>
        </div>
      </div>

      <div className='detail_rental_contract_flex1'>
        <div className='detail_rental_contract_flex1_item'>
          <h4>* Điều khoản của bên A:</h4>
          <span>- Tạo mọi điều kiện thuận lợi để bên B thực hiện theo hợp đồng.</span>
          <span>- Bàn giao các trang thiết bị và cơ sở vật chất mới cho bên B sử dụng.</span>
        </div>

        <div className='detail_rental_contract_flex1_item'>
          <h4>* Điều khoản của bên B:</h4>
          <span>- Thanh toán đầy đủ các khoản tiền theo đúng thỏa thuận.</span>
          <span>- Bảo quản các trang thiết bị và cơ sở vật chất của bên A trang bị cho ban đầu.</span>
          <span>- Không được tự ý sửa chữa, cải tạo cơ sở vật chất khi chưa được sự đồng ý của bên A.</span>
          <span>- Bên B phải chấp hành mọi quy định của pháp luật Nhà nước và quy định của địa phương.</span>
        </div>

        <div className='detail_rental_contract_flex1_item'>
          <h4>* Điều khoản chung</h4>
          <span>- Trong thời gian hợp đồng còn hiệu lực nếu bên nào vi phạm các điều khoản đã thỏa thuận thì bên còn lại có quyền đơn phương chấm dứt hợp đồng.</span>
          <span>- Một trong hai bên muốn chấm dứt hợp đồng trước thời hạn thì phải báo trước cho bên kia ít nhất 30 ngày và hai bên phải có sự thống nhất.</span>
          <span>- Bên A phải trả lại tiền đặt cọc cho bên B.</span>
          <span>- Bên nào vi phạm điều khoản chung thì phải chịu trách nhiệm trước pháp luật.</span>
        </div>
      </div>

      <div className='detail_rental_contract_button'>
        {user?.role_id === 1 && (
          <div className='detail_deposit_contract_button'>
            <BaseButton type="blue" onClick={() => setOpenModalConfirm(true)}>Xác nhận</BaseButton>
            <BaseButton type="red" onClick={() => setOpenModal(true)}>Hủy hợp đồng thuê</BaseButton>
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
  )
}
