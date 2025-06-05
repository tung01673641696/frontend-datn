import React from 'react'
import "./CreateContract.scss"
import Common from '../../../../layouts/LandlordLayout/Common/Common'
import BaseInput from '../../../../components/BaseInput/BaseInput'
import BaseButton from '../../../../components/BaseButton/BaseButton'


export default function CreateContract() {
  return (
    <Common>
      <form className='create_contract'>
        <span className='create_contract_title'>Tạo hợp đồng thuê phòng</span>

        <div className='create_contract_box'>
          <span className='create_contract_box_title'>Thông tin hợp đồng</span>
          <div className='create_contract_box_item'>
            <div className='create_contract_box_item_child'>
              <span>Họ và tên</span>
              <BaseInput name="name" />
            </div>

            <div className='create_contract_box_item_child'>
              <span>Số điện thoại</span>
              <BaseInput name="phone" />
            </div>
          </div>

          <div className='create_contract_box_item'>
            <div className='create_contract_box_item_child'>
              <span>Giá phòng</span>
              <BaseInput name="name" />
            </div>

            <div className='create_contract_box_item_child'>
              <span>Tiền cọc phòng</span>
              <BaseInput name="phone" />
            </div>
          </div>
          <div className='create_contract_box_item'>
            <div className='create_contract_box_item_child'>
              <span>Thuê từ ngày</span>
              <select>
                <option value="">1</option>
              </select>
            </div>

            <div className='create_contract_box_item_child'>
              <span>Thuê đến ngày</span>
              <select>
                <option value="">1</option>
              </select>
            </div>
          </div>

          <div className='create_contract_box_item'>
            <div className='create_contract_box_item_child'>
              <span>Tiền điện / 1 số</span>
              <BaseInput name="name" />
            </div>

            <div className='create_contract_box_item_child'>
              <span>Tiền nước / 1 số</span>
              <BaseInput name="phone" />
            </div>
          </div>

          <div className='create_contract_box_item'>
            <div className='create_contract_box_item_child'>
              <span>Chỉ số điện ban đầu</span>
              <BaseInput name="name" />
            </div>

            <div className='create_contract_box_item_child'>
              <span>Chỉ số nước ban đầu</span>
              <BaseInput name="phone" />
            </div>
          </div>

          <div className='create_contract_box_item1'>
            <BaseButton type="blue">Lưu hợp đồng</BaseButton>
            <BaseButton type="white">Quay lại</BaseButton>
          </div>
        </div>
      </form>
    </Common>
  )
}
