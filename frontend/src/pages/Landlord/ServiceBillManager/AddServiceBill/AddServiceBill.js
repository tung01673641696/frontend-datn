import React, { useEffect, useState } from 'react'
import './AddServiceBill.scss'
import { useDispatch, useSelector } from 'react-redux';
import BaseInput from '../../../../components/BaseInput/BaseInput'
import { getOneHouse } from '../../../../redux/reducers/house';
import { addBill } from '../../../../redux/reducers/bill';
import BaseButton from '../../../../components/BaseButton/BaseButton';
import { toast } from 'react-toastify';
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import locale from 'antd/es/date-picker/locale/vi_VN'
dayjs.locale('vi')

export default function AddServiceBill({ houseId, roomId, onClose }) {
  const dispatch = useDispatch()
  const { oneHouse } = useSelector((state) => state.houseReducer)
  const [electricUsage, setElectricUsage] = useState(0)
  const [waterUsage, setWaterUsage] = useState(0)
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    dispatch(getOneHouse(houseId))
  }, [houseId]);


  const electricPrice = parseInt(oneHouse?.electric_price || 0)
  const waterPrice = parseInt(oneHouse?.water_price || 0)

  const electricTotal = electricUsage * electricPrice
  const waterTotal = waterUsage * waterPrice
  const totalAmount = electricTotal + waterTotal;

  const handleAddBill = async () => {
    if (!selectedMonth) {
      toast.error("Vui lòng chọn tháng");
      return;
    }

    const billingDate = `${selectedMonth}-01`;

    const billData = {
      room_id: roomId,
      billing_date: selectedMonth,
      electric_usage: electricUsage,
      water_usage: waterUsage,
      electric_price: electricPrice,
      water_price: waterPrice,
      total_amount: totalAmount
    };

    try {
      const res = await dispatch(addBill(billData)).unwrap();
      toast.success("Tạo hóa đơn thành công");
      if (onClose) onClose();
    } catch (error) {
      toast.error("Tạo hóa đơn thất bại");
    }
  };

  return (
    <div className='add_bill'>
      <div className='add_bill_date'>
        <span className='add_bill_date_title'>Chọn tháng</span>
        <DatePicker
          picker="month"
          disabledDate={(current) => current && current < dayjs().startOf('month')}
          format="MM/YYYY"
          locale={locale}
          placeholder="Chọn tháng/năm"
          onChange={(date) => {
            if (date) {
              const formatted = dayjs(date).startOf('month').format('YYYY-MM-DD');
              setSelectedMonth(formatted);
            } else {
              setSelectedMonth('');
            }
          }}
        />
      </div>

      <table className="add_bill_table">
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
            <td>{parseInt(oneHouse?.electric_price)?.toLocaleString('vi-VN')}</td>
            <td>
              <BaseInput
                type="number"
                value={electricUsage}
                onChange={(e) => setElectricUsage(parseInt(e.target.value) || 0)}
              />
            </td>
            <td>{electricTotal.toLocaleString('vi-VN')}</td>
          </tr>

          <tr>
            <td>Tiền nước</td>
            <td>đ / khối</td>
            <td>{parseInt(oneHouse?.water_price)?.toLocaleString('vi-VN')}</td>
            <td>
              <BaseInput
                type="number"
                value={waterUsage}
                onChange={(e) => setWaterUsage(parseInt(e.target.value) || 0)}
              />
            </td>
            <td>{waterTotal.toLocaleString('vi-VN')}</td>
          </tr>
          <tr>
            <td colSpan={4}>Tổng</td>
            <td>{(electricTotal + waterTotal).toLocaleString('vi-VN')}</td>
          </tr>
        </tbody>
      </table>


      <BaseButton type="blue" onClick={handleAddBill}>
        Tạo hóa đơn
      </BaseButton>
    </div>
  )
}
