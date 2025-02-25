import React from 'react'
import './HouseManager.scss'
import Common from '../../../layouts/LandlordLayout/Common/Common'
import BaseButton from '../../../components/BaseButton/BaseButton'

export default function HouseManager() {
  return (
    <Common>
      <h3>Danh sách nhà</h3>

      <div className='add'>
        <BaseButton type="blue">Thêm nhà</BaseButton>
      </div>

      <table class="table table-bordered">
        <thead className="table">
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Tên nhà</th>
            <th scope="col">Số phòng</th>
            <th scope="col">Số phòng trống</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" className='ele'>1</th>
            <td className='ele'>Gohomy1</td>
            <td className='ele'>4 phòng</td>
            <td className='ele'>0</td>
            <td className='ele'>250 Kim Giang</td>
            <td className='ele'>
              <BaseButton type="warning">Sửa</BaseButton>
              <BaseButton type="red">Xóa</BaseButton>
            </td>
          </tr>

          <tr>
            <th scope="row" className='ele'>1</th>
            <td className='ele'>Gohomy1</td>
            <td className='ele'>4 phòng</td>
            <td className='ele'>0</td>
            <td className='ele'>250 Kim Giang</td>
            <td className='ele'>
              <BaseButton type="warning">Sửa</BaseButton>
              <BaseButton type="red">Xóa</BaseButton>
            </td>
          </tr>

          <tr>
            <th scope="row" className='ele'>1</th>
            <td className='ele'>Gohomy1</td>
            <td className='ele'>4 phòng</td>
            <td className='ele'>0</td>
            <td className='ele'>250 Kim Giang</td>
            <td className='ele'>
              <BaseButton type="warning">Sửa</BaseButton>
              <BaseButton type="red">Xóa</BaseButton>
            </td>
          </tr>

        </tbody>
      </table>
    </Common>
  )
}
