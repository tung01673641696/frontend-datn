import React, { useEffect, useState } from 'react'
import "./PostLandlord.scss"
import HeaderUser from '../../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../../layouts/UserLayout/FooterUser/FooterUser'
import BaseInput from '../../../components/BaseInput/BaseInput'
import BaseButton from '../../../components/BaseButton/BaseButton'
import { houseByOwner } from '../../../redux/reducers/house'
import { useDispatch, useSelector } from 'react-redux'

export default function PostLandlord() {
  const user = JSON.parse(localStorage.getItem("user"))
  const user_id = user.id
  const dispatch = useDispatch()
  const { listHouseByOwner } = useSelector((state) => state.houseReducer)

  const [form, setForm] = useState({
    title: '',
    house_id: '',
    room_id: '',
    room_type: '',
    area: '',
    floor: '',
    max_people: '',
    price: '',
    price_deposit: '',
    district_id: '',
    ward_id: '',
    description: '',
    user_id: user_id,
  })

  useEffect(() => {
    dispatch(houseByOwner(user_id))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })

    console.log(">>>>", form)
  }

  return (
    <div className='post_land'>
      <HeaderUser />

      <form className='post_land_box'>
        <h3 className='post_land_box_title'>Thêm bài đăng</h3>

        <div className='post_land_box_ele'>
          <BaseInput name="title" placeholder="Tiêu đề bài đăng" onChange={handleChange} />
        </div>

        <div className='post_land_box_ele'>
          <div className='post_land_box_ele_item'>
            <select name='house_id' value={form.house_id}>
              <option value="" disabled>Chọn nhà</option>
              {listHouseByOwner.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className='post_land_box_ele_item'>
            <select name='room_id'>
              <option value="">Chọn phòng</option>
            </select>
          </div>
        </div>


        <div className='post_land_box_ele'>
          <input type='file' />
        </div>

        <div className='post_land_box_ele'>
          <textarea
            name='description'
            onChange={handleChange}
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
