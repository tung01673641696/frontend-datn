import React, { useEffect, useState } from 'react'
import './DetailDepositContract.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import HeaderUser from '../../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../../layouts/UserLayout/FooterUser/FooterUser'
import BaseButton from '../../../components/BaseButton/BaseButton'
import { getDepositContractDetail } from '../../../redux/reducers/contract'
import { useParams } from 'react-router-dom'
import { cancelDepositContract } from '../../../redux/reducers/contract'
import BaseModal from '../../../components/BaseModal/BaseModal'
import { toast } from 'react-toastify'
import { confirmDepositContract } from '../../../redux/reducers/contract'

export default function DetailDepositContract() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('user'))
  const { renterId, roomId } = useParams()
  const { depositContractDetail } = useSelector((state) => state.contractReducer)
  const [openModal, setOpenModal] = useState(false)
  const [openModalConfirm, setOpenModalConfirm] = useState(false)

  console.log(">>>>>>>", depositContractDetail)

  useEffect(() => {
    if (renterId && roomId) {
      dispatch(getDepositContractDetail({ renterId, roomId }))
    }
  }, [renterId, roomId])

  const handleCancelContract = async () => {
    if (!depositContractDetail?.contract?.contract_id) return;

    try {
      await dispatch(cancelDepositContract(depositContractDetail.contract.contract_id));
      setOpenModal(false);
      toast.success("Hủy hợp đồng cọc thành công");
      navigate('/tenant/deposit-contract-manager', { state: { statusRental: 'reject' } });
    } catch (error) {
      console.error("Hủy hợp đồng thất bại:", error);
    }
  };


  const handleConfirmContract = async () => {
    if (!depositContractDetail?.contract?.contract_id) return;

    try {
      await dispatch(confirmDepositContract(depositContractDetail.contract.contract_id));
      await dispatch(getDepositContractDetail({ renterId, roomId }));
      setOpenModalConfirm(false);
      toast.success("Xác nhận hợp đồng cọc thành công");
    } catch (error) {
      console.error("Xác nhận hợp đồng cọc thất bại:", error);
    }
  };


  return (
    <div className='detail_deposit_contract'>
      <HeaderUser />

      <div className='detail_deposit_contract_box'>
        <h3>Chi tiết hợp đồng cọc</h3>

        <div className='detail_deposit_contract_box_flex'>
          <div className='detail_deposit_contract_box_flex_item'>
            <h4>Đại diện bên thuê</h4>
            <span>Họ và tên: {depositContractDetail?.renter?.name}</span>
            <span>Số điện thoại: {depositContractDetail?.renter?.phone}</span>
          </div>

          <div className='detail_deposit_contract_box_flex_item'>
            <h4>Đại diện bên chủ nhà</h4>
            <span>Họ và tên: {depositContractDetail?.landlord?.name}</span>
            <span>Số điện thoại: {depositContractDetail?.landlord?.phone}</span>
          </div>
        </div>

        <div className='detail_deposit_contract_box_flex1'>
          <h4>Thông tin phòng</h4>
          <span>Phòng {depositContractDetail?.room?.name} - Nhà {depositContractDetail?.house?.name}</span>
          <span>Địa chỉ: {depositContractDetail?.house?.address}</span>
          <span>giá thuê: {depositContractDetail?.room?.price ? `${Number(depositContractDetail?.room?.price).toLocaleString('vi-VN')}đ` : "Đang cập nhật"} / tháng</span>
          <span>Đã cọc: {depositContractDetail?.contract?.deposit_amount ? `${Number(depositContractDetail?.contract?.deposit_amount).toLocaleString('vi-VN')}đ` : "Đang cập nhật"}</span>
          <span>Ngày khách vào ở: {depositContractDetail?.contract?.start_date}</span>
          <span>Cam kết: Nếu đến ngày {depositContractDetail?.contract?.start_date},Khách hàng không đến kí hợp đồng thuê phòng thì số tiền cọc sẽ không được hoàn lại</span>
        </div>

        <div className='detail_deposit_contract_box_button'>
          {user?.role_id === 1 && (
            <div className='detail_deposit_contract_box_button'>
              {depositContractDetail?.contract?.status === 'pending' && (
                <>
                  <BaseButton type="blue" onClick={() => setOpenModalConfirm(true)}>Xác nhận</BaseButton>
                  <BaseButton type="red" onClick={() => setOpenModal(true)}>Hủy hợp đồng cọc</BaseButton>
                </>
              )}
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
          title="Xác nhận hủy hợp đồng"
          content="Bạn có chắc chắn muốn hủy hợp đồng cọc này không? Hành động này không thể hoàn tác."
          onCancel={() => setOpenModal(false)}
          onConfirm={handleCancelContract}
        />


        <BaseModal
          open={openModalConfirm}
          type="red"
          title="Xác nhận hợp đồng cọc"
          content="Bạn có muốn xác nhận hợp đồng cọc"
          onCancel={() => setOpenModalConfirm(false)}
          onConfirm={handleConfirmContract}
        />
      </div>
      <Footer />
    </div >
  )
}
