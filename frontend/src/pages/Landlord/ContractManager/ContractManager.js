import React, { useState, useEffect } from 'react'
import './ContractManager.scss'
import Common from '../../../layouts/LandlordLayout/Common/Common'
import { Table } from 'antd'
import Column from 'antd/es/table/Column'
import BaseButton from '../../../components/BaseButton/BaseButton'
import BaseModal from '../../../components/BaseModal/BaseModal'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { landlordGetAllContract } from '../../../redux/reducers/contract'
import { renewRentalContract } from '../../../redux/reducers/contract';
import { houseByOwner } from '../../../redux/reducers/house'
import { getRoomByHouse } from '../../../redux/reducers/room'
import DetailRentalContract from '../../Tenant/DetailRentalContract/DetailRentalContract'
import dayjs from 'dayjs'

export default function ContractManager() {
  const user = JSON.parse(localStorage.getItem("user"))
  const id = user.id
  const dispatch = useDispatch()
  const { allContract } = useSelector((state) => state.contractReducer)

  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectHouse, setSelectHouse] = useState("")
  const [selectRoom, setSelectRoom] = useState("")
  const [showViewContract, setShowViewContract] = useState(false)
  const [selectedContract, setSelectedContract] = useState(null);

  const [showRenewModal, setShowRenewModal] = useState(false);
  const [renewStartDate, setRenewStartDate] = useState('');
  const [renewEndDate, setRenewEndDate] = useState('');
  const [contractRenewing, setContractRenewing] = useState(null);

  const { listHouseByOwner } = useSelector((state) => state.houseReducer)
  const { listRoomByHouse } = useSelector((state) => state.roomReducer)

  useEffect(() => {
    dispatch(landlordGetAllContract(id));
  }, []);

  useEffect(() => {
    dispatch(houseByOwner(id))
  }, [id])

  const handleHouseChange = (e) => {
    const houseId = Number(e.target.value);
    setSelectHouse(houseId)
    setSelectRoom("")
    if (houseId) {
      dispatch(getRoomByHouse(houseId))
    }
  }

  const getStatusLabel = (item) => {
    if (!item.end_date) return 'Không xác định';

    const daysLeft = dayjs(item.end_date).diff(dayjs(), 'day');

    if (daysLeft < 0) return 'Đã hết hạn';
    if (daysLeft <= 7) return `Còn ${daysLeft} ngày (sắp hết hạn)`;
    if (daysLeft <= 30) return `Còn ${daysLeft} ngày`;

    return 'Đang thuê';
  };

  const getStatusLabelWithColor = (contract) => {
    const endDate = dayjs(contract.end_date);
    const today = dayjs();
    const diff = endDate.diff(today, 'day');

    if (diff < 0) {
      return <span>Đã hết hạn</span>;
    } else if (diff <= 30) {
      return <span style={{ color: 'red' }}>Sắp hết hạn ({diff} ngày)</span>;
    } else {
      return <span style={{ color: 'blue' }}>Đang thuê</span>;
    }
  };

  const filteredContracts = allContract.filter(contract => {
    const matchStatus = selectedStatus ? contract.status === selectedStatus : true;
    const matchHouse = selectHouse ? contract.house?.id === selectHouse : true;
    const matchRoom = selectRoom ? contract.room?.id === selectRoom : true;
    return matchStatus && matchHouse && matchRoom;
  });

  console.log(">>>>>>>>>>", allContract)

  const handleShowContract = (item) => {
    setSelectedContract(item.room.id);
    setShowViewContract(true)
  };

  const handleRenewClick = (contract) => {
    setContractRenewing(contract);
    setRenewStartDate(contract.end_date);
    setRenewEndDate('');
    setShowRenewModal(true);
  };

  const handleConfirmRenew = () => {
    dispatch(renewRentalContract({
      contractId: contractRenewing.contract_id,
      newStartDate: renewStartDate,
      newEndDate: renewEndDate
    })).then(() => {
      setShowRenewModal(false);
      dispatch(landlordGetAllContract(id));
    });
  };

  return (
    <Common>
      <h3 className='contract_mana_title'>Quản lý hợp đồng</h3>


      <div className='contract_mana'>
        <div className='contract_mana_select'>
          <div className='contract_mana_select_item'>
            <select
              value={selectHouse}
              onChange={handleHouseChange}
            >
              <option value="">Chọn nhà</option>
              {listHouseByOwner.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>

          <div className='contract_mana_select_item'>
            <select
              value={selectRoom}
              onChange={(e) => setSelectRoom(Number(e.target.value))}
            >
              <option value="">Chọn phòng</option>
              {listRoomByHouse.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>

          <div className='contract_mana_select_item'>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Trạng thái hợp đồng</option>
              <option value="signed">Đang thuê</option>
              <option value="cancelled">Đã hết hạn</option>
            </select>
          </div>
        </div>

        <Table style={{ textAlignLast: 'center' }}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: false,
            pageSizeOptions: ['10', '20', '30'],
          }}
          dataSource={filteredContracts}
          bordered
        >
          <Column title={"STT"} render={(_, __, index) => index + 1} key="id" />
          <Column title={"Tên nhà"}
            render={(item) => (
              <span>{item?.house?.name}</span>
            )}
          />

          <Column title={"Tên phòng"}
            render={(item) => (
              <span>{item?.room?.name}</span>
            )}
          />

          <Column title={"Người kí HĐ cọc"}
            render={(item) => (
              <span>{item?.tenant?.name}</span>
            )}
          />

          <Column title={"Trạng thái"}
            render={(item) => getStatusLabelWithColor(item)}
          />

          <Column title={"Hành động"}
            render={(item) => (
              <>
                <BaseButton type="blue" onClick={() => handleShowContract(item)}>Xem</BaseButton>
                <BaseButton type="green" onClick={() => handleRenewClick(item)}>Gia hạn</BaseButton>
              </>
            )}
          />
        </Table>

        <BaseModal
          open={showViewContract}
          type="blue"
          width="50%"
          title="Xem chi tiết hợp đồng thuê"
          content={<DetailRentalContract roomId={selectedContract} />}
          onCancel={() => setShowViewContract(false)}
          showCancel={false}
          showConfirm={false}
        />

        <BaseModal
          open={showRenewModal}
          title="Gia hạn hợp đồng"
          type="blue"
          width="40%"
          content={
            <div className="renew">
              <div className='renew_item'>
                <label>Ngày bắt đầu mới:</label>
                <input type="date" readOnly value={renewStartDate} onChange={e => setRenewStartDate(e.target.value)} />
              </div>
              <div className='renew_item'>
                <label>Ngày kết thúc mới:</label>
                <input type="date" value={renewEndDate} onChange={e => setRenewEndDate(e.target.value)} />
              </div>
            </div>
          }
          onCancel={() => setShowRenewModal(false)}
          onConfirm={() => handleConfirmRenew()}
          showCancel={true}
          showConfirm={true}
        />
      </div>
    </Common>
  )
}
