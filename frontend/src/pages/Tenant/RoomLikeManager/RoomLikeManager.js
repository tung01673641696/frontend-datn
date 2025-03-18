import React from 'react'
import "./RoomLikeManager.scss"
import HeaderUser from '../../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../../layouts/UserLayout/FooterUser/FooterUser'
import CardRoomLike from '../../../layouts/TenantLayout/RoomLikeManagerLayout/CardRoomLike/CardRoomLike'

export default function RoomLikeManager() {
  const room = [
    {
      id: 1,
      title: "Tiêu đề",
      price: "4.000.000đ",
      address: "Quận Hoàng Mai",
      date: "20/3/2025"
    },
    {
      id: 2,
      title: "Tiêu đề",
      price: "5.000.000đ",
      address: "Quận Hoàng Mai",
      date: "20/3/2025"
    }
  ]

  return (
    <div className='room_like_mana'>
      <HeaderUser />

      <div className='room_like_mana_content'>
        <h3>Danh sách phòng yêu thích</h3>

        <div className='room_like_mana_content_item'>
          {room.map((item) => (
            <CardRoomLike />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
