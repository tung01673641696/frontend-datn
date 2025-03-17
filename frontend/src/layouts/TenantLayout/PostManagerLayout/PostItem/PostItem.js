import React from 'react'
import "./PostItem.scss"
import Img from '../../../../assets/Images/NeedAvatar/avatar.png'
import BaseButton from '../../../../components/BaseButton/BaseButton'

export default function PostItem() {
  return (
    <div className='post-item'>

      <div className='post-item_box'>
        <div className='post-item_box_left'>
          <img src={Img} />
        </div>

        <div className='post-item_box_right'>
          <span className='post-item_box_right_title'>Tìm phòng cho 4 người quanh đại học Ngoại Thương</span>
          <span className='post-item_box_right_common'>Số người ở: 4</span>
          <span className='post-item_box_right_common'>Loại phòng: homestay</span>
          <span className='post-item_box_right_common'>Giá từ: 1.000.000-3.000.000đ /tháng</span>
          <span className='post-item_box_right_common'>Quận: Đống Đa</span>
          <span className='post-item_box_right_common'>Ngày đăng: 20/3/2025</span>
          <span className='post-item_box_right_action'>
            <BaseButton type="blue">Xem bài đăng</BaseButton>
            <BaseButton type="warning">Sửa bài đăng</BaseButton>
            <BaseButton type="red">Xóa bài đăng</BaseButton>
          </span>
        </div>
      </div>
    </div>
  )
}
