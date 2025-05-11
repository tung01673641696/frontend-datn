import React, { useEffect, useState } from 'react'
import "./PostManager.scss"
import HeaderUser from '../../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../../layouts/UserLayout/FooterUser/FooterUser'
import BaseButton from '../../../components/BaseButton/BaseButton'

import { useDispatch, useSelector } from 'react-redux'

export default function PostManager() {
  const user = JSON.parse(localStorage.getItem("user"))
  const id_user = user.id
  const dispatch = useDispatch()
  const [status, setStatus] = useState("pending")



  return (
    <div className='post-mana'>
      <HeaderUser />
      <div className='post-mana_box'>
        <h3>Quản lý bài đăng</h3>

        <div className='post-mana_box_status'>
          <div className='post-mana_box_status_ele'>
            <BaseButton
              type="white"
              className={status === "pending" ? "active-button" : ""}
              onClick={() => setStatus("pending")}
            >
              Đang chờ duyệt
            </BaseButton>
          </div>

          <div className='post-mana_box_status_ele'>
            <BaseButton
              type="white"
              className={status === "approved" ? "active-button" : ""}
              onClick={() => setStatus("approved")}
            >
              Đang hoạt động
            </BaseButton>
          </div>

          <div className='post-mana_box_status_ele'>
            <BaseButton
              type="white"
              className={status === "reject" ? "active-button" : ""}
              onClick={() => setStatus("reject")}
            >
              Bị từ chối
            </BaseButton>
          </div>
        </div>

        <div className='post-mana_box_child'>
          {/* {postsByOneCustomer?.map((item) => (
            <PostItem item={item} />
          ))} */}
        </div>
      </div>
      <Footer />
    </div>
  )
}
