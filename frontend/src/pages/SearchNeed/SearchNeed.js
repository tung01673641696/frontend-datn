import React from 'react'
import './SearchNeed.scss'
import HeaderUser from '../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../layouts/UserLayout/FooterUser/FooterUser'
import FilterSearchNeed from '../../layouts/SearchNeedLayout/FilterSearchNeed/FilterSearchNeed'
import ListNeed from '../../layouts/SearchNeedLayout/ListNeed/ListNeed'

export default function SearchNeed() {
  return (
    <div className='search-need'>
      <HeaderUser />

      <div className='search-need_wrap'>
        <FilterSearchNeed />
        <ListNeed />
      </div>

      <Footer />
    </div>
  )
}
