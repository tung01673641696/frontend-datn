import React, { useEffect, useState } from 'react'
import './ListRoom.scss'
import CardRoom2 from '../../../components/CardRoom2/CardRoom2'


export default function ListRoom() {

  const [room, setRoom] = useState([])
  useEffect(() => {
    fetch("http://localhost:3001/room")
      .then((res) => res.json())
      .then((data) => setRoom(data))
  }, [])

  return (
    <div className='list-room'>
      <h4>Danh sách phòng</h4>



      <div className='list-room_all'>
        {room?.slice(0, 10).map((item) => (
          <CardRoom2 />
        ))}
      </div>

      <div className='list-room_button'>
        <button>Xem thêm</button>
      </div>
    </div>
  )
}
