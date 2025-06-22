import React, { useState } from 'react'
import "./PostItemByLandlord.scss"
import BaseButton from '../../../../components/BaseButton/BaseButton'
import { useNavigate } from 'react-router-dom'
import BaseModal from '../../../../components/BaseModal/BaseModal'
import { deletePostsByCustomer } from '../../../../redux/reducers/posts'
import { useDispatch } from 'react-redux'

export default function PostItemByLandlord({ item }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isShow, setIsShow] = useState(false)
  const [selectPostsId, setSelectPostsId] = useState(null)

  const handleShow = (postId) => {
    setSelectPostsId(postId)
    setIsShow(true)
  }

  function handleClose() {
    setIsShow(false)
  }

  const handleDelete = async () => {
    if (selectPostsId) {
      await dispatch(deletePostsByCustomer(selectPostsId))
      setIsShow(false)
    }
  }



  return (
    <div className='post-item'>
      <>
        <BaseModal
          open={isShow}
          title="Xóa nhà"
          type="red"
          content="Bạn có chắc chắn muốn xóa phòng này không ?"
          onCancel={handleClose}
          onConfirm={handleDelete}
        />
      </>
      <div className='post-item_box'>
        <div className='post-item_box_left'>
          <img
            src={item?.image ? JSON.parse(item.image)[0] : ""}
            alt="ảnh phòng"
            style={{ width: "100%", height: "35vh", objectFit: "cover" }}
          />
        </div>
        <div className='post-item_box_right'>
          <span className='post-item_box_right_title'>{item?.title}</span>
          <span className='post-item_box_right_common'>Loại phòng: {item?.room_type}</span>
          <span className='post-item_box_right_common'>Giá phòng: {Number(item?.price).toLocaleString('vi-VN')}đ / tháng</span>
          <span className='post-item_box_right_common'>Số người ở: {item?.max_people}</span>
          <span className='post-item_box_right_common'>Vị trí: {item?.name_ward ? `${item?.name_ward}` : ''} , {item?.name_district}</span>
          <span className='post-item_box_right_common'>Thời gian đăng: <span className='post-item_box_right_common_time'>{item?.created_at}</span></span>
          <span className='post-item_box_right_action'>
            <BaseButton type="blue">Xem chi tiết</BaseButton>
            <BaseButton type="warning" onClick={() => navigate(`/tenant/edit-post/post_id/${item.id}`)}>Sửa bài đăng</BaseButton>
            <BaseButton type="red" onClick={() => handleShow(item.id)}>Xóa bài đăng</BaseButton>
          </span>
        </div>
      </div>
    </div>
  )
}
