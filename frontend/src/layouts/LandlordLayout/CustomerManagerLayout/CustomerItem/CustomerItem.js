import React, { useState, useEffect } from 'react'
import "./CustomerItem.scss"
import Img from '../../../../assets/Images/User/client.jpg'
import BaseButton from '../../../../components/BaseButton/BaseButton'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { rejectRentalRequest } from '../../../../redux/reducers/rentalRequest'
import { approveRentalRequest } from '../../../../redux/reducers/rentalRequest'
import BaseModal from '../../../../components/BaseModal/BaseModal'
import CreateDepositContract from '../../../../pages/Landlord/RentalRequestManager/CreateDepositContract/CreateDepositContract'
import { createDepositContract } from '../../../../redux/reducers/contract'
import CreateContract from '../../../../pages/Landlord/RentalRequestManager/CreateContract/CreateContract'
import { toast } from 'react-toastify'
import { getAllRentalRequest } from '../../../../redux/reducers/rentalRequest'

export default function CustomerItem({ item }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showDepositModal, setShowDepositModal] = useState(false);
  const allRentalRequest = useSelector(state => state.rentalrequestReducer.data || [])

  const renter_id = item?.renter?.id || item?.renter_id;
  const room_id = item?.room?.id || item?.room_id;

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

  console.log("item", item)


  const handleOpenDepositModal = () => {
    setFormData(prev => ({
      ...prev,
      renter_id: item.renter_id,
      room_id: item.room_id,
      name: item.renter_name,
      phone: item.renter_phone,
      type: 'deposit',
      amount: '',
      start_date: '',
      note: '',
      status: 'signed'
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
      toast.success("Tạo hợp đồng cọc thành công, đợi khách thuê vào xác nhận")
      setShowDepositModal(false);

    } catch (error) {
      if (error?.status === 409) {
        toast.warning(error?.data?.message || "Hợp đồng cọc đã tồn tại.");
      } else {
        toast.error("Lỗi tạo hợp đồng cọc");
      }
    }
  }

  function handleCreateContract() {
    navigate(`/landlord/create-contract/renter_id/${renter_id}/room_id/${item?.room?.id}`)
  }


  return (
    <div className='customer_item'>
      <div className='customer_item_ele'>
        <div className='customer_item_ele_avatar'>
          <img src={Img} />
        </div>

        <div className='customer_item_ele_posision'>
          {item?.status === 'pending_contract' && (
            <div className='customer_item_ele_posision_status1'>Khách thuê chưa xác nhận cọc</div>
          )}

          {item?.status === 'signed' && (
            <div className='customer_item_ele_posision_status2'>Khách thuê đã xác nhận cọc</div>
          )}
        </div>

        <div className='customer_item_ele_content'>
          <span className='customer_item_ele_content_child'>{item?.renter_name || item?.renter.name}</span>
          <span className='customer_item_ele_content_child'>{item?.renter_phone || item?.renter.phone}</span>
          <span className='customer_item_ele_content_child'>Thích: P{item?.room_name || item?.room.name} - Nhà {item?.house_name || item?.house.name}</span>
          <span className='customer_item_ele_content_child'>Địa chỉ nhà: {item?.house_address || item?.house.address}</span>
          <span className='customer_item_ele_content_child'>{item?.reserved_at}</span>
          <span className='customer_item_ele_content_action'>
            {item?.status === 'pending' ? (
              <>
                <BaseButton type="white" onClick={handleApprove}>Xác nhận</BaseButton>
                <BaseButton type="red" onClick={handleReject}>Từ chối</BaseButton>
              </>
            ) : ['approved'].includes(item?.status) ? (
              <>
                <BaseButton type="green" onClick={handleOpenDepositModal}>Tạo hợp đồng cọc</BaseButton>
                <BaseButton type="red">Từ chối</BaseButton>
              </>
            )
              : ['signed'].includes(item?.status) ? (
                <>
                  <BaseButton type="blue" onClick={() => navigate(`/tenant/deposit-contract-detail/renter/${renter_id}/room/${room_id}`)}>Xem hợp đồng cọc</BaseButton>

                  <BaseButton type="green" onClick={handleCreateContract}>Tạo hợp đồng thuê</BaseButton>
                </>
              )
                : (
                  <><BaseButton type="blue" onClick={handleApprove} disabled={alreadyApproved}>Xem hợp đồng cọc</BaseButton></>
                )}
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
    </div >
  )
}
