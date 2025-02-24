import React from 'react'
import './FilterSearchNeed.scss'
import BaseButton from '../../../components/BaseButton/BaseButton'

export default function FilterSearchNeed() {
  return (
    <div className='filter-search-need'>
      <span>Tìm kiếm phòng</span>

      <BaseButton type="red">
        <i class="bi bi-funnel" style={{ marginRight: "5px" }}></i>
        Bộ lọc tìm kiếm
      </BaseButton>
    </div>
  )
}
