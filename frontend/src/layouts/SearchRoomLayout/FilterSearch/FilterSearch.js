import React, { useState } from 'react'
import './FilterSearch.scss'
import FrameFilter from '../../../components/FrameFilter/FrameFilter'

export default function FilterSearch() {

  return (
    <div className='filter-search'>
      <span>Tìm kiếm phòng</span>

      <button>
        <i class="bi bi-funnel"></i>
        <span>Bộ lọc tìm kiếm</span>
      </button>

    </div>
  )
}
