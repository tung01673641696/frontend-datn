import React from 'react'
import './SearchFilterNeed.scss'

export default function SearchFilterNeed() {
  return (
    <div className='search-filter-need'>
      <span>Tìm kiếm nhu cầu tìm phòng</span>

      <button>
        <i class="bi bi-funnel"></i>
        <span>Bộ lọc tìm kiếm</span>
      </button>
    </div>
  )
}
