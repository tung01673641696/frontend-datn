import React from 'react'
import './HouseManager.scss'
import Common from '../../../layouts/LandlordLayout/Common/Common'

export default function HouseManager() {
  return (
    <Common>
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
            <th scope="row" className=''>1</th>
            <td >Gohomy1</td>
            <td>4 phòng</td>
            <td>0</td>
            <td>250 Kim Giang</td>
            <td>Sửa / xóa</td>
          </tr>
        </tbody>
      </table>
    </Common>
  )
}
