import React from 'react'
import './Home.scss'
import HeaderUser from '../../layouts/UserLayout/HeaderUser/HeaderUser'
import FooterUser from '../../layouts/UserLayout/FooterUser/FooterUser'
import Title from '../../components/Title/Title'
import Banner from '../../layouts/HomeLayout/Banner/Banner'
import District from '../../layouts/HomeLayout/District/District'
import RoomNew from '../../layouts/HomeLayout/RoomNew/RoomNew'
import RoomNeed from '../../layouts/HomeLayout/RoomNeed/RoomNeed'

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <div className='home'>
      <HeaderUser />

      <Banner />

      <Title text={"KHÁM PHÁ PHÒNG TRỌ CÁC QUẬN"} />
      <District />

      <Title text={"PHÒNG TRỌ MỚI NHẤT"} />
      <RoomNew />

      <Title text={"NHU CẦU CỦA NGƯỜI THUÊ"} />
      <RoomNeed />

      <FooterUser />
    </div>
  )
}
