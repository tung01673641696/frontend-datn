import React, { useState } from 'react'
import './FilterSearch.scss'
import FrameFilter from '../../../components/FrameFilter/FrameFilter'

export default function FilterSearch() {
  const [open, setOpen] = useState(false)

  return (
    <div className='filter-search'>
      <span>Tìm kiếm phòng</span>

      <button onClick={() => setOpen(true)}>
        <i class="bi bi-funnel"></i>
        <span>Bộ lọc tìm kiếm</span>
      </button>

      <FrameFilter isOpen={open} onClose={() => setOpen(false)} />
    </div>
  )
}
