import React from 'react'
import './NeedDetail.scss'
import HeaderUser from '../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../layouts/UserLayout/FooterUser/FooterUser'
import RoomContentNeed from '../../layouts/NeedDetailLayout/RoomContentNeed/RoomContentNeed'
import RoomNeedSame from '../../layouts/NeedDetailLayout/RoomNeedSame/RoomNeedSame' 

export default function NeedDetail() {
  return (
    <div className='search-need'>
      <HeaderUser />

      <div className='search-need_wrap'>
        <RoomContentNeed />
        <RoomNeedSame />
      </div>

      <Footer />
    </div>
  )
}
