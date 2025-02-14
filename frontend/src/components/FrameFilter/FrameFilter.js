import React from 'react'

export default function FrameFilter({ isOpen, onClose }) {

  if (!isOpen) return null

  return (
    <div>
      cửa sổ bộ lọc

      <button onClick={onClose}>Đóng</button>
    </div>
  )
}
