import React, { useState } from 'react'
import './SearchRoom.scss'
import HeaderUser from '../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../layouts/UserLayout/FooterUser/FooterUser'
import FilterSearch from '../../layouts/SearchRoomLayout/FilterSearch/FilterSearch'
import ListRoom from '../../layouts/SearchRoomLayout/ListRoom/ListRoom'

export default function SearchRoom() {

  return (
    <div className='search-room'>
      <HeaderUser />

      <div className='search-room_wrap'>
        <FilterSearch />
        <ListRoom />
      </div>

      <Footer />
    </div>
  )
}
