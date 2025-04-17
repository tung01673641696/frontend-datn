import React, { useEffect, useState } from 'react'
import "./EditPostByTenant.scss"
import HeaderUser from '../../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../../layouts/UserLayout/FooterUser/FooterUser'
import BaseInput from '../../../components/BaseInput/BaseInput'
import BaseButton from '../../../components/BaseButton/BaseButton'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDistrict } from '../../../redux/reducers/address'
import { getWard } from '../../../redux/reducers/address'
import { toast } from 'react-toastify'
import { editPostsByCustomer, getOnePostsByCustomer } from '../../../redux/reducers/posts'

export default function EditPostByTenant() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("user"))
  const user_id = user.id
  const params = useParams()
  const post_id = params.id

  const { district, ward } = useSelector((state) => state.addressReducer)
  const { onePostsByCustomer } = useSelector((state) => state.postsReducer)

  const [posts, setPosts] = useState({
    user_id: user_id,
    title: "",
    room_type: "",
    price: "",
    max_people: "",
    district_id: "",
    ward_id: "",
    description: ""
  })

  useEffect(() => {
    dispatch(getOnePostsByCustomer(post_id))
  }, [post_id])

  useEffect(() => {
    if (onePostsByCustomer) {
      setPosts({
        user_id: user_id,
        title: onePostsByCustomer?.title,
        room_type: onePostsByCustomer?.room_type,
        price: onePostsByCustomer?.price,
        max_people: onePostsByCustomer?.max_people,
        district_id: onePostsByCustomer?.district_id,
        ward_id: onePostsByCustomer?.ward_id,
        description: onePostsByCustomer?.description
      });
    }
  }, [onePostsByCustomer])

  useEffect(() => {
    if (onePostsByCustomer?.district_id) {
      dispatch(getWard(onePostsByCustomer.district_id))
    }
  }, [onePostsByCustomer?.district_id])

  useEffect(() => {
    dispatch(getDistrict())
  }, [])

  const handleDistrictChange = (e) => {
    const district_id = e.target.value;
    setPosts({ ...posts, district_id, ward_id: "" })
    dispatch(getWard(district_id))
  }

  const handleChange = (e) => {
    setPosts({ ...posts, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !posts.user_id ||
      !posts.title ||
      !posts.room_type ||
      !posts.price ||
      !posts.max_people ||
      !posts.district_id ||
      !posts.description

    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin")
    }

    dispatch(editPostsByCustomer({ postId: post_id, data: posts }))
    navigate(`/tenant/post-manager`)
  }

  return (
    <div className='edit_post_tenant'>
      <HeaderUser />

      <form className='edit_post_tenant_box' onSubmit={handleSubmit}>
        <h3 className='edit_post_tenant_box_title'>Chỉnh sửa bài đăng</h3>

        <div className='edit_post_tenant_box_ele'>
          <BaseInput name="title" value={posts.title} onChange={handleChange} placeholder="Tiêu đề bài đăng" />
        </div>

        <div className='edit_post_tenant_box_ele'>
          <div className='edit_post_tenant_box_ele_item'>
            <select name='room_type' value={posts.room_type} onChange={handleChange}>
              <option value="" disabled>Loại phòng</option>
              <option value="trọ thường">Trọ thường</option>
              <option value="homestay">Homestay</option>
              <option value="chung cư mini">Chung cư mini</option>
            </select>
          </div>
          <div className='edit_post_tenant_box_ele_item'>
            <BaseInput name="price" value={posts.price} onChange={handleChange} placeholder="Giá phòng" />
          </div>
          <div className='edit_post_tenant_box_ele_item'>
            <BaseInput name="max_people" value={posts.max_people} onChange={handleChange} placeholder="Số người ở" />
          </div>
        </div>

        <div className='edit_post_tenant_box_ele'>
          <div className='edit_post_tenant_box_ele_item'>
            <select>
              <option value="">Hà Nội</option>
            </select>
          </div>
          <div className='edit_post_tenant_box_ele_item'>
            <select name='district_id' value={posts.district_id} onChange={handleDistrictChange}>
              <option value="" disabled>Chọn Quận</option>
              {district.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className='edit_post_tenant_box_ele_item'>
            <select name='ward_id' value={posts.ward_id} onChange={handleChange}>
              <option value="" disabled>Chọn Phường</option>
              {ward.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className='edit_post_tenant_box_ele'>
          <textarea
            name='description'
            value={posts.description}
            onChange={handleChange}
            placeholder="Chi tiết tìm phòng"
          />
        </div>

        <div className='edit_post_tenant_box_ele'>
          <BaseButton type="red">Cập nhật bài đăng</BaseButton>
        </div>

      </form>

      <Footer />
    </div>
  )
}
