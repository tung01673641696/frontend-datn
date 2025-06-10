import React, { useState, useEffect } from 'react'
import "./CreateContract.scss"
import Common from '../../../../layouts/LandlordLayout/Common/Common'
import BaseInput from '../../../../components/BaseInput/BaseInput'
import BaseButton from '../../../../components/BaseButton/BaseButton'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getOneRoom } from '../../../../redux/reducers/room'
import { createContract } from '../../../../redux/reducers/contract'
import { getDetailUser } from '../../../../redux/reducers/user'
import { getDetailTenantByRoom } from '../../../../redux/reducers/tenant'

export default function CreateContract() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const renter_id = params.renterId
  const room_id = params.roomId
  const { oneRoom } = useSelector((state) => state.roomReducer)
  const { detailUser } = useSelector((state) => state.userReducer)
  const { detailTenantByRoom } = useSelector((state) => state.tenantReducer)

  console.log("........", detailTenantByRoom)

  const contractParams = {
    renter_id: renter_id,
    room_id: room_id,
  };

  useEffect(() => {
    if (room_id) {
      dispatch(getDetailTenantByRoom(room_id));
    }
  }, [room_id, dispatch]);


  useEffect(() => {
    const contractParams = {
      renter_id: renter_id,
      room_id: room_id,
    };
    localStorage.setItem('contract_params', JSON.stringify(contractParams));
    if (room_id) {
      dispatch(getOneRoom(room_id));
    }
  }, [room_id]);

  useEffect(() => {
    dispatch(getDetailUser(renter_id));
  }, []);

  useEffect(() => {
    if (detailUser) {
      setContract((prev) => ({
        ...prev,
        name: detailUser.name || "",
        phone: detailUser.phone || "",
      }));
    }
  }, [detailUser]);

  const [contract, setContract] = useState({
    room_id: room_id,
    name: "",
    phone: "",
    identity_number: "",
    start_date: "",
    end_date: "",
  })

  const handleChange = (e) => {
    console.log("e", e.target.value)
    setContract({ ...contract, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      !contract.name ||
      !contract.phone ||
      !contract.identity_number ||
      !contract.start_date ||
      !contract.end_date
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return
    }
    try {
      const res = await dispatch(createContract(contract)).unwrap()
      toast.success("Tạo hợp đồng thuê thành công");
      console.log("eeeee", contract)

    } catch (error) {
      if (error?.status === 409) {
        toast.error(error?.data?.error || "Phòng đã có hợp đồng thuê.");
      } else {
        toast.error("Tạo hợp đồng thất bại");
      }
    }
  }

  return (
    <Common>
      <form className='create_contract' onSubmit={handleSubmit}>
        <span className='create_contract_title'>Tạo hợp đồng thuê phòng</span>

        <div className='create_contract_box'>
          <span className='create_contract_box_title'>Thông tin hợp đồng</span>
          <div className='create_contract_box_item1'>
            <div className='create_contract_box_item_child1'>
              <span>Họ tên người thuê</span>
              <BaseInput name="name" value={contract.name} onChange={handleChange} />
            </div>

            <div className='create_contract_box_item_child1'>
              <span>Số điện thoại</span>
              <BaseInput name="phone" type='number' value={contract.phone} onChange={handleChange} />
            </div>

            <div className='create_contract_box_item_child1'>
              <span>CMT / CCCD</span>
              <BaseInput name="identity_number" onChange={handleChange} />
            </div>
          </div>

          <div className='create_contract_box_item'>
            <div className='create_contract_box_item_child'>
              <span>Thuê từ ngày</span>
              <input
                type="date" name="start_date" onChange={handleChange}
              />
            </div>

            <div className='create_contract_box_item_child'>
              <span>Thuê đến ngày</span>
              <input
                type="date" name="end_date" onChange={handleChange}
              />
            </div>
          </div>

          <div className='create_contract_box_item2'>
            <BaseButton type="blue">Lưu hợp đồng</BaseButton>
            <BaseButton type="white" onClick={() => navigate(-1)}>Quay lại</BaseButton>
          </div>
        </div>
      </form>
    </Common>
  )
}
