import React from 'react'
import "./Post.scss"
import HeaderUser from '../../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../../layouts/UserLayout/FooterUser/FooterUser'
import BaseInput from '../../../components/BaseInput/BaseInput'
import BaseButton from '../../../components/BaseButton/BaseButton'

export default function Post() {
  return (
    <div className='post'>
      <HeaderUser />

      <form className='post_box'>
        <h3>Thêm bài đăng</h3>

        <div className='post_box_ele'>
          <BaseInput placeholder="Tiêu đề bài đăng" />
        </div>

        <div className='post_box_ele'>
          <div className='post_box_ele_item'>
            <select>
              <option value="">Homestay</option>
            </select>
          </div>
          <div className='post_box_ele_item'>
            <BaseInput placeholder="Giá phòng" />
          </div>
          <div className='post_box_ele_item'>
            <BaseInput placeholder="Số người ở" />
          </div>
        </div>

        <div className='post_box_ele'>
          <div className='post_box_ele_item'>
            <select>
              <option value="">Hà Nội</option>
            </select>
          </div>
          <div className='post_box_ele_item'>
            <select>
              <option value="">Hà Nội</option>
            </select>
          </div>
          <div className='post_box_ele_item'>
            <select>
              <option value="">Hà Nội</option>
            </select>
          </div>
        </div>

        <div className='post_box_ele'>
          <BaseInput placeholder="Số điện thoại" />
        </div>

        <div className='post_box_ele'>
          <BaseInput placeholder="Ghi chú" />
        </div>

        <div className='post_box_ele'>
          <BaseButton>Đăng bài</BaseButton>
        </div>
      </form>

      <Footer />
    </div>
  )
}
