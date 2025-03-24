import React, { useState } from 'react'
import "./PostTenant.scss"
import HeaderUser from '../../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../../layouts/UserLayout/FooterUser/FooterUser'
import BaseInput from '../../../components/BaseInput/BaseInput'
import BaseButton from '../../../components/BaseButton/BaseButton'

export default function PostTenant() {
  const [price, setPrice] = useState("")

  const formatPrice = (val) => {
    let num = val.replace(/\D/g, "");
    return new Intl.NumberFormat("vi-VN").format(num) + " vnđ";
  };

  const handleChangePrice = (e) => {
    setPrice(formatPrice(e.target.value));
  }

  return (
    <div className='post_tenant'>
      <HeaderUser />

      <form className='post_tenant_box'>
        <h3 className='post_tenant_box_title'>Thêm bài đăng</h3>

        <div className='post_tenant_box_ele'>
          <BaseInput placeholder="Tiêu đề bài đăng" />
        </div>

        <div className='post_tenant_box_ele'>
          <div className='post_tenant_box_ele_item'>
            <select>
              <option value="">Loại phòng</option>
            </select>
          </div>
          <div className='post_tenant_box_ele_item'>
            <BaseInput placeholder="Giá phòng" value={price} onChange={handleChangePrice} />
          </div>
          <div className='post_tenant_box_ele_item'>
            <select>
              <option value="">Tầng</option>
            </select>
          </div>
        </div>

        <div className='post_tenant_box_ele'>
          <div className='post_tenant_box_ele_item'>
            <select>
              <option value="">Hà Nội</option>
            </select>
          </div>
          <div className='post_tenant_box_ele_item'>
            <select>
              <option value="">Chọn quận</option>
            </select>
          </div>
          <div className='post_tenant_box_ele_item'>
            <BaseInput placeholder="Số người ở" />
          </div>
        </div>

        <div className='post_tenant_box_ele'>
          <div className='post_tenant_box_ele_item'>
            <BaseInput placeholder="Số điện thoại" />
          </div>
        </div>

        <div className='post_tenant_box_ele'>
          <textarea
            onChange=""
            placeholder="Chi tiết tìm phòng"
          />
        </div>

        <div className='post_tenant_box_ele'>
          <BaseButton type="red">Đăng bài</BaseButton>
        </div>

      </form>

      <Footer />
    </div>
  )
}
