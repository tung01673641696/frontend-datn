import React, { useEffect, useState } from 'react'
import "./PostLandlord.scss"
import HeaderUser from '../../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../../layouts/UserLayout/FooterUser/FooterUser'
import BaseInput from '../../../components/BaseInput/BaseInput'
import BaseButton from '../../../components/BaseButton/BaseButton'
import { houseByOwner } from '../../../redux/reducers/house'
import { useDispatch, useSelector } from 'react-redux'
import { getRoomByHouse } from '../../../redux/reducers/room'
import { toast } from 'react-toastify'
import { addPostsByLandlord } from '../../../redux/reducers/posts'

export default function PostLandlord() {
  const user = JSON.parse(localStorage.getItem("user"))
  const user_id = user.id
  const dispatch = useDispatch()
  const { listHouseByOwner } = useSelector((state) => state.houseReducer)
  const [selectHouse, setSelectHouse] = useState("")
  const { listRoomByHouse } = useSelector((state) => state.roomReducer)

  const [form, setForm] = useState({
    title: '',
    room_id: '',
    user_id: user_id,
  })

  useEffect(() => {
    dispatch(houseByOwner(user_id))
  }, [])

  const handleHouseChange = (e) => {
    const houseId = e.target.value
    setSelectHouse(houseId)
    if (houseId) {
      dispatch(getRoomByHouse(houseId))
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      !form.title ||
      !form.room_id ||
      !form.user_id
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin")
    } else {
      try {
        const res = await dispatch(addPostsByLandlord(form))
        if (res.payload.data.message) {
          toast.success(res.payload.data.message)
        }
        else {
          toast.error(res.payload.data.error)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className='post_land'>
      <HeaderUser />

      <form className='post_land_box' onSubmit={handleSubmit}>
        <h3 className='post_land_box_title'>Thêm bài đăng</h3>

        <div className='post_land_box_ele'>
          <BaseInput name="title" placeholder="Tiêu đề bài đăng" onChange={handleChange} />
        </div>

        <div className='post_land_box_ele'>
          <div className='post_land_box_ele_item'>
            <select name='house_id' value={selectHouse} onChange={handleHouseChange}>
              <option value="" disabled>Chọn nhà</option>
              {listHouseByOwner.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className='post_land_box_ele_item'>
            <select name='room_id' value={form.room_id} onChange={handleChange}>
              <option value="">Chọn phòng</option>
              {listRoomByHouse.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className='post_land_box_ele'>
          <BaseButton type="red">Đăng bài</BaseButton>
        </div>

      </form>

      <Footer />
    </div>
  )
}
