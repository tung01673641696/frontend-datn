import React, { useEffect, useState } from 'react'
import './ListNeed.scss'
import CardNeed from '../../../components/CardNeed/CardNeed'
import BaseButton from '../../../components/BaseButton/BaseButton'

export default function ListNeed() {
  const [need, setNeed] = useState([])
  useEffect(() => {
    fetch("http://localhost:3001/room-need")
      .then((res) => res.json())
      .then((data) => setNeed(data))
  }, [])

  return (
    <div className='list-need'>
      <h4>Danh sách nhu cầu tìm phòng</h4>

      <div className='list-need_all'>
        {need?.slice(0, 10).map((item) => (
          <CardNeed item={item} />
        ))}
      </div>

      <BaseButton type="red">Xem thêm</BaseButton>
    </div>
  )
}
