import React from 'react'
import "./PostItem.scss"
import Img from '../../../../assets/Images/NeedAvatar/avatar.png'
import BaseButton from '../../../../components/BaseButton/BaseButton'
import { useNavigate } from 'react-router-dom'

export default function PostItem({ item }) {
  const navigate = useNavigate() 

  return (
    <div className='post-item'>
      <div className='post-item_box'>
        <div className='post-item_box_left'>
          <img src={Img} />
        </div>
        <div className='post-item_box_right'>
          <span className='post-item_box_right_title'>{item?.title}</span>
          <span className='post-item_box_right_common'>Số người ở: {item?.max_people}</span>
          <span className='post-item_box_right_common'>Loại phòng: {item?.room_type}</span>
          <span className='post-item_box_right_common'>Giá phòng: {Number(item?.price).toLocaleString('vi-VN')}đ / tháng</span>
          <span className='post-item_box_right_common'>Vị trí: {item?.name_ward ? `${item?.name_ward}` : ''} {item?.name_district}</span>
          <span className='post-item_box_right_common'>Chi tiết: {item?.description}</span>
          <span className='post-item_box_right_common'>Thời gian đăng: <span className='post-item_box_right_common_time'>{item?.created_at}</span></span>
          <span className='post-item_box_right_action'>
            <BaseButton type="blue">Xem bài đăng</BaseButton>
            <BaseButton type="warning" onClick={() => navigate(`/tenant/edit-post/post_id/${item.id}`)}>Sửa bài đăng</BaseButton>
            <BaseButton type="red">Xóa bài đăng</BaseButton>
          </span>
        </div>
      </div>
    </div>
  )
}
