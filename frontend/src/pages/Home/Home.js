import React from 'react'
import './Home.scss'
import HeaderUser from '../../layouts/UserLayout/HeaderUser/HeaderUser'
import FooterUser from '../../layouts/UserLayout/FooterUser/FooterUser'
import Title from '../../components/Title/Title'
import Banner from '../../layouts/HomeLayout/Banner/Banner'
import District from '../../layouts/HomeLayout/District/District'
import RoomNew from '../../layouts/HomeLayout/RoomNew/RoomNew'
import RoomNeed from '../../layouts/HomeLayout/RoomNeed/RoomNeed'
import Service from '../../layouts/HomeLayout/Service/Service'

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"))
  const isLandlord = user?.role_id === 2;
  const isTenant = user?.role_id === 1;
  return (
    <div className='home'>
      <HeaderUser />

      <Banner />

      {!isLandlord && (
        <>
          <Title text={"KHÁM PHÁ PHÒNG TRỌ CÁC QUẬN"} />
          <District />

          <Title text={"PHÒNG TRỌ MỚI NHẤT"} />
          <RoomNew />
        </>
      )}

      {!isTenant && (
        <>
          <Title text={"NHU CẦU CỦA NGƯỜI THUÊ"} />
          <RoomNeed />
        </>
      )}

      <Title text={"DỊCH VỤ TIỆN ÍCH"} />
      <Service />

      <FooterUser />
    </div>
  )
}
