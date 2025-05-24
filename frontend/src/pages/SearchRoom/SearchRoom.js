import React, { useState, useEffect } from 'react'
import './SearchRoom.scss'
import HeaderUser from '../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../layouts/UserLayout/FooterUser/FooterUser'
import ListRoom from '../../layouts/SearchRoomLayout/ListRoom/ListRoom'
import { useParams } from 'react-router-dom'

export default function SearchRoom() {
  const { district_id } = useParams()

  return (
    <div className='search-room'>
      <HeaderUser />

      <div className='search-room_wrap'>
        <ListRoom districtId={district_id} />
      </div>

      <Footer />
    </div>
  )
}
