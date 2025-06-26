import React, { useEffect, useState } from 'react'
import './ShowServiceBill.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getDetailBill } from '../../../../redux/reducers/bill';
import dayjs from 'dayjs'

export default function ShowServiceBill({ billId }) {
  const dispatch = useDispatch();
  const { serviceBillDetail } = useSelector(state => state.billReducer);

  useEffect(() => {
    if (billId) {
      dispatch(getDetailBill(billId));
    }
  }, [billId, dispatch]);

  const totalElectric = serviceBillDetail?.electric_price * serviceBillDetail?.electric_usage || 0;
  const totalWater = serviceBillDetail?.water_price * serviceBillDetail?.water_usage || 0;
  const totalAmount = totalElectric + totalWater;

  console.log(">>>>>>>>", serviceBillDetail)

  return (
    <div className='show_bill'>
      <span className='show_bill_title'>
        Hóa đơn dịch vụ tháng
        <span style={{ margin: '0 5px' }}>{dayjs(serviceBillDetail?.billing_date).format('M/YYYY')}</span>
        (  <span style={{ color: serviceBillDetail?.status === 'paid' ? 'green' : 'red' }}>
          {serviceBillDetail?.status === 'paid' ? 'đã thanh toán' : 'chưa thanh toán'}
        </span>)
      </span>

      <table className="show_bill_table">
        <tbody>
          <tr>
            <td className=''>Loại dịch vụ</td>
            <td className=''>Đơn vị</td>
            <td className=''>Đơn giá</td>
            <td className=''>Chỉ số</td>
            <td className=''>Thành tiền</td>
          </tr>

          <tr>
            <td>Tiền điện</td>
            <td>đ / số</td>
            <td>{Number(serviceBillDetail?.electric_price)?.toLocaleString('vi-VN')}</td>
            <td>{serviceBillDetail?.electric_usage}</td>
            <td>{totalElectric.toLocaleString()}</td>
          </tr>

          <tr>
            <td>Tiền nước</td>
            <td>đ / khối</td>
            <td>{Number(serviceBillDetail?.water_price)?.toLocaleString('vi-VN')}</td>
            <td>{serviceBillDetail?.water_usage}</td>
            <td>{totalWater.toLocaleString()}</td>
          </tr>
          <tr>
            <td colSpan={4}>Tổng</td>
            <td>{totalAmount.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
