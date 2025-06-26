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
import { houseByOwner } from '../../../redux/reducers/house'
import { getRoomByHouse } from '../../../redux/reducers/room'
import DetailRentalContract from '../../Tenant/DetailRentalContract/DetailRentalContract'

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
            render={(item) => (
              <span>{item?.status === 'signed' ? 'Đang thuê' : 'đã hết hạn'}</span>
            )}
          />

          <Column title={"Hành động"}
            render={(item) => (
              <><BaseButton type="blue" onClick={() => handleShowContract(item)}>Xem</BaseButton></>
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
        />
      </div>
    </Common>
  )
}
