import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./RoomContentNeed.scss"
import { useParams } from 'react-router-dom'
import Img from '../../../assets/Images/NeedAvatar/avatar.png'
import BaseButton from '../../../components/BaseButton/BaseButton'
import { getOnePostsByCustomer } from '../../../redux/reducers/posts'

export default function RoomContentNeed() {
  const { post_id } = useParams()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("user"))

  const { onePostsByCustomer } = useSelector((state) => state.postsReducer)

  useEffect(() => {
    dispatch(getOnePostsByCustomer(post_id))
  }, [post_id])

  return (
    <div className='room_content_need'>
      <div className='room_content_need_box'>
        <div className='room_content_need_box_left'>
          <img src={Img} />
        </div>

        <div className='room_content_need_box_right'>
          <span className='room_content_need_box_right_title'>{onePostsByCustomer.title}</span>
          <span className='room_content_need_box_right_common'>Loại phòng: {onePostsByCustomer.room_type}</span>
          <span className='room_content_need_box_right_common'>Số lượng người: {onePostsByCustomer.max_people}</span>
          <span className='room_content_need_box_right_common'>Giá: {Number(onePostsByCustomer.price).toLocaleString('vi-VN')}đ</span>
          <span className='room_content_need_box_right_common'>{onePostsByCustomer?.district?.name}</span>
          <span className='room_content_need_box_right_common'>Chi tiết: {onePostsByCustomer?.description}</span>
          <span className='room_content_need_box_right_common'>Đăng ngày: {onePostsByCustomer.created_at && new Date(onePostsByCustomer.created_at).toLocaleDateString('vi-VN')}</span>

          {user.role_id === 2 && (
            <div className='room_content_need_box_right_contact'>
              <div className='room_content_need_box_right_contact_tele'>
                <BaseButton type="red">
                  <i class="bi bi-telephone" style={{ marginRight: "5px" }}></i>
                  Liên hệ ngay
                </BaseButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
