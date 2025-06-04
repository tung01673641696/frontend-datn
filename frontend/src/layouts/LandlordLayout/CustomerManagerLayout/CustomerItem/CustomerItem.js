import React, { useState, useEffect } from 'react'
import "./CustomerItem.scss"
import Img from '../../../../assets/Images/User/client.jpg'
import BaseButton from '../../../../components/BaseButton/BaseButton'
import { useDispatch, useSelector } from 'react-redux'
import { rejectRentalRequest } from '../../../../redux/reducers/rentalRequest'
import { approveRentalRequest } from '../../../../redux/reducers/rentalRequest'
import BaseModal from '../../../../components/BaseModal/BaseModal'
import CreateDepositContract from '../../../../pages/Landlord/RentalRequestManager/CreateDepositContract/CreateDepositContract'
import { createDepositContract } from '../../../../redux/reducers/contract'
import { toast } from 'react-toastify'

export default function CustomerItem({ item }) {
  const dispatch = useDispatch()
  const [showDepositModal, setShowDepositModal] = useState(false);
  const allRentalRequest = useSelector(state => state.rentalrequestReducer.data || [])

  const [formData, setFormData] = useState({
    renter_id: item?.renter_id || '',
    room_id: item?.room_id || '',
    name: item?.renter_name || '',
    phone: item?.renter_phone || '',
    type: 'deposit',
    amount: '',
    start_date: '',
    note: '',
    status: 'signed'
  });

  const handleOpenDepositModal = () => {
    setFormData(prev => ({
      ...prev,
      renter_id: item.renter_id,
      room_id: item.room_id,
    }));
    setShowDepositModal(true);
  };

  const handleReject = () => {
    dispatch(rejectRentalRequest(item.id))
  };

  const handleApprove = () => {
    dispatch(approveRentalRequest(item.id))
  }

  const alreadyApproved = item?.status === 'pending' &&
    allRentalRequest?.some(
      req => req.room_name === item.room_name &&
        req.house_name === item.house_name &&
        req.status === 'approved'
    );

  const handleConfirmCreateDepositContract = async () => {
    const { renter_id, room_id, amount, start_date, note } = formData;

    if (!amount || !start_date) {
      alert("Vui lòng nhập đầy đủ số tiền cọc và ngày vào.");
      return;
    }

    try {
      await dispatch(createDepositContract(formData)).unwrap();
      toast.success("Tạo hợp đồng cọc thành công")
      setShowDepositModal(false);
    } catch (error) {
      if (error?.status === 409) {
        toast.warning(error?.data?.message || "Hợp đồng cọc đã tồn tại.");
      } else {
        toast.error("Lỗi tạo hợp đồng cọc");
      }
    }
  }

  return (
    <div className='customer_item'>
      <div className='customer_item_ele'>
        <div className='customer_item_ele_avatar'>
          <img src={Img} />
        </div>

        <div className='customer_item_ele_content'>
          <span className='customer_item_ele_content_child'>{item?.renter_name}</span>
          <span className='customer_item_ele_content_child'>{item?.renter_phone}</span>
          <span className='customer_item_ele_content_child'>Thích: P{item?.room_name} - Nhà {item?.house_name}</span>
          <span className='customer_item_ele_content_child'>Địa chỉ nhà: {item?.house_address}</span>
          <span className='customer_item_ele_content_child'>{item?.reserved_at}</span>
          <span className='customer_item_ele_content_action'>
            {item?.status === 'pending' ? (
              <>
                <BaseButton type="white" onClick={handleApprove}>Xác nhận</BaseButton>
                <BaseButton type="red" onClick={handleReject}>Từ chối</BaseButton>
              </>
            ) : item?.status === 'approved' ? (
              <>
                <BaseButton type="green" onClick={handleOpenDepositModal}>Tạo hợp đồng cọc</BaseButton>
                <BaseButton type="red" onClick={handleReject}>Từ chối</BaseButton>
              </>
            ) : <><BaseButton type="white" onClick={handleApprove} disabled={alreadyApproved}>Xác nhận</BaseButton></>}
          </span>
        </div>

        <BaseModal
          open={showDepositModal}
          type="red"
          title="Tạo hợp đồng cọc"
          content={<CreateDepositContract formData={formData} setFormData={setFormData} />}
          onCancel={() => setShowDepositModal(false)}
          onConfirm={handleConfirmCreateDepositContract}
        />
      </div>
    </div>
  )
}
