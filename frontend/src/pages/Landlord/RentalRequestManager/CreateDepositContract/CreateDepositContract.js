import React from 'react'
import "./CreateDepositContract.scss"

export default function CreateDepositContract({ formData, setFormData }) {
  return (
    <div className="deposit_contract">
      <div className='deposit_contract_item'>
        <label>Họ tên</label>
        <input type="text" value={formData.name} disabled />
      </div>

      <div className='deposit_contract_item'>
        <label>Số điện thoại</label>
        <input type="text" value={formData.phone} disabled />
      </div>

      <div className='deposit_contract_item'>
        <label>Số tiền cọc</label>
        <input
          type="number"
          value={formData.amount || ''}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
      </div>

      <div className='deposit_contract_item'>
        <label>Ngày vào</label>
        <input
          type="date"
          value={formData.start_date}
          onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
        />
      </div>

      <div className='deposit_contract_item'>
        <label>Ghi chú</label>
        <textarea
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
        />
      </div>
    </div>
  )
}
