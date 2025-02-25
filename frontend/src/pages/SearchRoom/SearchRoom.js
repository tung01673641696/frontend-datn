import React, { useState } from 'react'
import './SearchRoom.scss'
import HeaderUser from '../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../layouts/UserLayout/FooterUser/FooterUser'
import FilterSearch from '../../layouts/SearchRoomLayout/FilterSearch/FilterSearch'
import ListRoom from '../../layouts/SearchRoomLayout/ListRoom/ListRoom'
import BaseModal from '../../components/BaseModal/BaseModal'

export default function SearchRoom() {
  const [isShow, setIsShow] = useState(false)

  function handleClick() {
    setIsShow(true)
  }

  function handleClose() {
    setIsShow(false)
  }

  return (
    <div className='search-room'>
      <HeaderUser />

      <div className='search-room_wrap'>
        <FilterSearch onClick={handleClick} />

        <ListRoom />
      </div>

      <BaseModal open={isShow} title="Bộ lọc tìm kiếm" type="red" onClose={handleClose}>
        nội dung ở đây
      </BaseModal>

      <Footer />
    </div>
  )
}
