import React from 'react'
import './Home.scss'
import HeaderUser from '../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../layouts/UserLayout/FooterUser/FooterUser'

export default function Home() {
  return (
    <div className='home'>
      <HeaderUser />

      <Footer />
    </div>
  )
}
