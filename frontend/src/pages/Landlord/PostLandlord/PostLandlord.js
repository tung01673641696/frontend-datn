import React, { useState } from 'react'
import "./PostLandlord.scss"
import HeaderUser from '../../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../../layouts/UserLayout/FooterUser/FooterUser'
import BaseInput from '../../../components/BaseInput/BaseInput'
import BaseButton from '../../../components/BaseButton/BaseButton'

export default function PostLandlord() {
  const [price, setPrice] = useState("")

  const formatPrice = (val) => {
    let num = val.replace(/\D/g, "");
    return new Intl.NumberFormat("vi-VN").format(num) + " vnđ";
  };

  const handleChangePrice = (e) => {
    setPrice(formatPrice(e.target.value));
  }

  return (
    <div className='post_land'>
      <HeaderUser />

      <form className='post_land_box'>
        <h3 className='post_land_box_title'>Thêm bài đăng</h3>

        <div className='post_land_box_ele'>
          <BaseInput placeholder="Tiêu đề bài đăng" />
        </div>

        <div className='post_land_box_ele'>
          <div className='post_land_box_ele_item'>
            <select>
              <option value="">Chọn nhà</option>
            </select>
          </div>
          <div className='post_land_box_ele_item'>
            <select>
              <option value="">Chọn phòng</option>
            </select>
          </div>
          <div className='post_land_box_ele_item'>
            <select>
              <option value="">Loại phòng</option>
            </select>
          </div>
        </div>

        <div className='post_land_box_ele'>
          <div className='post_land_box_ele_item'>
            <select>
              <option value="">Diện tích</option>
            </select>
          </div>
          <div className='post_land_box_ele_item'>
            <select>
              <option value="">Tầng</option>
            </select>
          </div>
          <div className='post_land_box_ele_item'>
            <select>
              <option value="">Số người tối đa</option>
            </select>
          </div>
        </div>

        <div className='post_land_box_ele'>
          <div className='post_land_box_ele_item'>
            <select>
              <option value="">Tỉnh / Thành phố</option>
            </select>
          </div>
          <div className='post_land_box_ele_item'>
            <select>
              <option value="">Quận / Huyện</option>
            </select>
          </div>
          <div className='post_land_box_ele_item'>
            <select>
              <option value="">Phường / Xã</option>
            </select>
          </div>
        </div>

        <div className='post_land_box_ele'>
          <div className='post_land_box_ele_item'>
            <BaseInput placeholder="Tiền phòng" />
          </div>
          <div className='post_land_box_ele_item'>
            <BaseInput placeholder="Tiền cọc" />
          </div>
          <div className='post_land_box_ele_item'>
            <BaseInput placeholder="Số điện thoại" />
          </div>
        </div>

        <div className='post_land_box_ele'>
          <input type='file'/>
        </div>

        <div className='post_land_box_ele'>
          <textarea
            onChange=""
            placeholder="Mô tả chi tiết"
          />
        </div>

        <div className='post_land_box_ele'>
          <BaseButton type="red">Đăng bài</BaseButton>
        </div>

      </form>

      <Footer />
    </div>
  )
}
