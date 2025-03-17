import React, { useEffect } from 'react'
import './HouseManager.scss'
import Common from '../../../layouts/LandlordLayout/Common/Common'
import BaseButton from '../../../components/BaseButton/BaseButton'
import { Table } from 'antd'
import Column from 'antd/es/table/Column'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { houseByOwner } from '../../../redux/reducers/house'

export default function HouseManager() {
  const params = useParams()
  const dispatch = useDispatch()
  const { listHouseByOwner } = useSelector((state) => state.houseReducer)

  useEffect(() => {
    dispatch(houseByOwner(params.id));
  }, [dispatch, params]);

  return (
    <Common>
      <h3>Danh sách nhà</h3>

      <div className='add_house'>
        <BaseButton type="blue">Thêm nhà</BaseButton>
      </div>

      <Table style={{ textAlignLast: 'center' }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
          pageSizeOptions: ['10', '20', '30'],
        }}
        dataSource={listHouseByOwner}
      >
        <Column title={"STT"} dataIndex="id" key="id" />
        <Column title={"Tên nhà"}
          render={(item) => (
            <span>{item?.name}</span>
          )}
        />

        <Column title={"Số phòng"}
          render={(value) => (
            <span>{value?.room_number}</span>
          )}
        />

        <Column title={"Số phòng trống"}
          render={(value) => (
            <span>{value?.room_number_null}</span>
          )}
        />

        <Column title={"Địa chỉ"}
          render={(value) => (
            <span>{value?.address}</span>
          )}
        />

        <Column title={"Thao tác"}
          render={() => (
            <>
              <BaseButton type="warning">Sửa</BaseButton>
              <BaseButton type="red">Xóa</BaseButton>
            </>
          )}
        />
      </Table>
    </Common>
  )
}
