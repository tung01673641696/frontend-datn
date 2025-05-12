import React from 'react'
import './NeedDetail.scss'
import HeaderUser from '../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../layouts/UserLayout/FooterUser/FooterUser'
import RoomContentNeed from '../../layouts/NeedDetailLayout/RoomContentNeed/RoomContentNeed'
import RoomNeedSame from '../../layouts/NeedDetailLayout/RoomNeedSame/RoomNeedSame'
import { useParams } from 'react-router-dom'

export default function NeedDetail() {
  const id = useParams()

  return (
    <div className='search-need'>
      <HeaderUser />

      <div className='search-need_wrap'>
        <RoomContentNeed id={id}/>
        <RoomNeedSame />
      </div>

      <Footer />
    </div>
  )
}
