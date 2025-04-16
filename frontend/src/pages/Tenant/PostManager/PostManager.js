import React, { useState } from 'react'
import "./PostManager.scss"
import HeaderUser from '../../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../../layouts/UserLayout/FooterUser/FooterUser'
import BaseButton from '../../../components/BaseButton/BaseButton'
import PostItem from '../../../layouts/TenantLayout/PostManagerLayout/PostItem/PostItem'

export default function PostManager() {
  const [status, setStatus] = useState("pending")

  return (
    <div className='post-mana'>
      <HeaderUser />
      <div className='post-mana_box'>
        <h3>Quản lý bài đăng</h3>

        <div className='post-mana_box_status'>
          <div className='post-mana_box_status_ele'>
            <BaseButton type="white" onClick={() => setStatus("pending")}>Đang chờ duyệt</BaseButton>
          </div>

          <div className='post-mana_box_status_ele'>
            <BaseButton type="red" onClick={() => setStatus("approved")}>Đang hoạt động</BaseButton>
          </div>

          <div className='post-mana_box_status_ele'>
            <BaseButton type="white" onClick={() => setStatus("expired")}>Đã hết hạn</BaseButton>
          </div>
        </div>

        <div className='post-mana_box_child'>
          <PostItem />
        </div>
      </div>
      <Footer />
    </div>
  )
}
