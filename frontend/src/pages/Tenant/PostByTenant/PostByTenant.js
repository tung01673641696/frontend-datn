import React, { useEffect, useState } from 'react'
import "./PostByTenant.scss"
import HeaderUser from '../../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../../layouts/UserLayout/FooterUser/FooterUser'
import BaseInput from '../../../components/BaseInput/BaseInput'
import BaseButton from '../../../components/BaseButton/BaseButton'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDistrict } from '../../../redux/reducers/address'
import { getWard } from '../../../redux/reducers/address'
import { toast } from 'react-toastify'
import { addPostsByCustomer } from '../../../redux/reducers/posts'

export default function PostByTenant() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const user_id = params.id

  const { district, ward } = useSelector((state) => state.addressReducer)

  const [posts, setPosts] = useState({
    user_id: user_id,
    title: "",
    room_type: "",
    price: "",
    max_people: "",
    district_id: "",
    ward_id: "",
    description: "",
  })

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
      !posts.title ||
      !posts.room_type ||
      !posts.price ||
      !posts.max_people ||
      !posts.district_id
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin")
    }
    try {
      const res = await dispatch(addPostsByCustomer(posts))
      if (res.payload.status === 200) {
        toast.success(res.payload.data.message)
        navigate(`/tenant/post-manager`)
      } else { }
    } catch (error) {
      toast.error("Thêm bài đăng thất bại")
    }
  }

  return (
    <div className='post_tenant'>
      <HeaderUser />

      <form className='post_tenant_box' onSubmit={handleSubmit}>
        <h3 className='post_tenant_box_title'>Thêm bài đăng</h3>

        <div className='post_tenant_box_ele'>
          <BaseInput name="title" onChange={handleChange} placeholder="Tiêu đề bài đăng" />
        </div>

        <div className='post_tenant_box_ele'>
          <div className='post_tenant_box_ele_item'>
            <select name='room_type' value={posts.room_type} onChange={handleChange}>
              <option value="" disabled>Loại phòng</option>
              <option value="trọ thường">Trọ thường</option>
              <option value="homestay">Homestay</option>
              <option value="chung cư mini">Chung cư mini</option>
            </select>
          </div>
          <div className='post_tenant_box_ele_item'>
            <BaseInput name="price" onChange={handleChange} placeholder="Giá phòng" />
          </div>
          <div className='post_tenant_box_ele_item'>
            <BaseInput name="max_people" onChange={handleChange} placeholder="Số người ở" />
          </div>
        </div>

        <div className='post_tenant_box_ele'>
          <div className='post_tenant_box_ele_item'>
            <select>
              <option value="">Hà Nội</option>
            </select>
          </div>
          <div className='post_tenant_box_ele_item'>
            <select name='district_id' onChange={handleDistrictChange}>
              <option value="">Chọn Quận</option>
              {district.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className='post_tenant_box_ele_item'>
            <select name='ward_id' onChange={handleChange}>
              <option value="">Chọn Phường</option>
              {ward.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className='post_tenant_box_ele'>
          <textarea
            name='description'
            onChange={handleChange}
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
