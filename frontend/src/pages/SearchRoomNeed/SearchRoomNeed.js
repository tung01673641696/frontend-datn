import React from 'react'
import './SearchRoomNeed.scss'
import HeaderUser from '../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../layouts/UserLayout/FooterUser/FooterUser'
import SearchFilterNeed from '../../layouts/SearchNeedLayout/SearchFilterNeed/SearchFilterNeed'
import RoomContentNeed from '../../layouts/SearchNeedLayout/RoomContentNeed/RoomContentNeed'
import RoomNeedSame from '../../layouts/SearchNeedLayout/RoomNeedSame/RoomNeedSame'

export default function SearchRoomNeed() {
  return (
    <div className='search-need'>
      <HeaderUser />

      <div className='search-need_wrap'>
        <SearchFilterNeed />
        <RoomContentNeed />
        <RoomNeedSame />
      </div>

      <Footer />
    </div>
  )
}
