import React, { useState } from 'react'
import './FilterSearch.scss'
import FrameFilter from '../../../components/FrameFilter/FrameFilter'
import BaseButton from '../../../components/BaseButton/BaseButton'

export default function FilterSearch({ onClick }) {

  return (
    <div className='filter-search'>
      <span>Tìm kiếm phòng</span>

      <BaseButton type="red" onClick={onClick}>
        <i class="bi bi-funnel" style={{ marginRight: "5px" }}></i>
        Bộ lọc tìm kiếm
      </BaseButton>
    </div>
  )
}
