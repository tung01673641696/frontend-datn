import React, { useState } from 'react'
import "./PostItemByTenant.scss"
import Img from '../../../../assets/Images/NeedAvatar/avatar.png'
import BaseButton from '../../../../components/BaseButton/BaseButton'
import { useNavigate } from 'react-router-dom'
import BaseModal from '../../../../components/BaseModal/BaseModal'
import { deletePostsByCustomer } from '../../../../redux/reducers/posts'
import { useDispatch } from 'react-redux'
import { tenantGetAllPost } from '../../../../redux/reducers/posts'

export default function PostItemByTenant({ item, status, tenantId }) {
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
      await dispatch(tenantGetAllPost({ tenantId, status }))
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
          <img src={Img} />
        </div>
        <div className='post-item_box_right'>
          <span className='post-item_box_right_title'>{item?.title}</span>
          <span className='post-item_box_right_common'>Loại phòng: {item?.room_type}</span>
          <span className='post-item_box_right_common'>Giá phòng: {Number(item?.price).toLocaleString('vi-VN')}đ / tháng</span>
          <span className='post-item_box_right_common'>Số người ở: {item?.max_people}</span>
          <span className='post-item_box_right_common'>Vị trí: {item?.name_ward ? `${item?.name_ward}` : ''} , {item?.name_district}</span>
          <span className='post-item_box_right_common'>Thời gian đăng: <span className='post-item_box_right_common_time'>{item?.created_at}</span></span>
          <span className='post-item_box_right_common'>Mong muốn: {item?.description}</span>
          <span className='post-item_box_right_action'>
            <BaseButton type="warning" onClick={() => navigate(`/tenant/edit-post/post_id/${item.id}`)}>Sửa bài đăng</BaseButton>
            <BaseButton type="red" onClick={() => handleShow(item.id)}>Xóa bài đăng</BaseButton>
          </span>
        </div>
      </div>
    </div>
  )
}
