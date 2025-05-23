import React, { useEffect, useState } from 'react'
import "./AddRoom.scss"
import Common from '../../../../layouts/LandlordLayout/Common/Common'
import BaseInput from '../../../../components/BaseInput/BaseInput'
import BaseButton from '../../../../components/BaseButton/BaseButton'
import { useDispatch, useSelector } from 'react-redux'
import { addHouse } from '../../../../redux/reducers/house'
import { useNavigate } from 'react-router-dom'
import { houseByOwner } from '../../../../redux/reducers/house'
import { toast } from 'react-toastify'
import { addRoom } from '../../../../redux/reducers/room'

export default function AddRoom() {
  const [room, setRoom] = useState({
    house_id: "",
    room_type: "",
    name: "",
    floor: "",
    price: "",
    price_deposit: "",
    area: "",
    user_number: "",
    description: "",
    is_available: ""
  })

  const [images, setImages] = useState([])
  const user = JSON.parse(localStorage.getItem("user"))
  const id = user.id
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { listHouseByOwner } = useSelector((state) => state.houseReducer)

  const handleChangeImage = (event) => {
    const files = Array.from(event.target.files);
    console.log("files", files)

    if (files.length + images.length > 4) {
      toast.error("Chỉ được chọn tối đa 4 ảnh!");
      return;
    }

    const promises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => resolve(reader.result);
      });
    });

    Promise.all(promises).then((newImages) => {
      setImages((prevImages) => [...prevImages, ...newImages]);
    });
  };

  useEffect(() => {
    dispatch(houseByOwner(id))
  }, [])

  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      house_id: room.house_id,
      room_type: room.room_type,
      name: room.name,
      floor: room.floor,
      price: room.price,
      price_deposit: room.price_deposit,
      area: room.area,
      user_number: room.user_number,
      image: images,
      description: room.description,
      is_available: room.is_available
    }
    console.log(data)

    if (
      !room.house_id ||
      !room.room_type ||
      !room.name ||
      !room.floor ||
      !room.price ||
      !room.price_deposit ||
      !room.area ||
      !room.user_number ||
      images.length === 0 ||
      !room.description ||
      room.is_available === ""
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return
    }
    try {
      const res = await dispatch(addRoom(data))
      if (res.payload.data.status) {
        toast.error(res.payload.data.message)

      } else {
        toast.success("Thêm phòng thành công");
        navigate(`/landlord/room-manager`)
      }
    } catch (error) {
      toast.error("Thêm phòng thất bại")
    }
  }

  return (
    <Common>
      <form className='add_room' onSubmit={handleSubmit}>
        <span className='add_room_title'>Thêm phòng</span>

        <div className='add_room_box'>
          <div className='add_room_box_child'>
            <div className='add_room_box_child_item1'>
              <select name="house_id" value={room.house_id} onChange={handleChange} className='add_room_box_child_select'>
                <option value="" disabled>Chọn nhà</option>
                {listHouseByOwner.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className='add_room_box_child_item1'>
              <BaseInput type='number' name="name" value={room.name} onChange={handleChange} placeholder="Tên phòng" />
            </div>

            <div className='add_room_box_child_item1'>
              <select name="room_type" value={room.room_type} onChange={handleChange} className='add_room_box_child_select'>
                <option value="" disabled>Loại phòng</option>
                <option value="trọ thường">Trọ thường</option>
                <option value="homestay">Homestay</option>
                <option value="chung cư mini">Chung cư mini</option>
              </select>
            </div>
          </div>

          <div className='add_room_box_child'>
            <div className='add_room_box_child_item'>
              <BaseInput type='number' min="1" name="floor" value={room.floor} onChange={handleChange} placeholder="Tầng" />
            </div>

            <div className='add_room_box_child_item'>
              <BaseInput type='number' min="1" name="price" value={room.price} onChange={handleChange} placeholder="Giá phòng" />
            </div>
          </div>

          <div className='add_room_box_child'>
            <div className='add_room_box_child_item'>
              <BaseInput type='number' min="1" name="price_deposit" value={room.price_deposit} onChange={handleChange} placeholder="Tiền cọc" />
            </div>

            <div className='add_room_box_child_item'>
              <BaseInput type='number' min="1" name="area" value={room.area} onChange={handleChange} placeholder="Diện tích" />
            </div>
          </div>

          <div className='add_room_box_child'>
            <div className='add_room_box_child_item'>
              <BaseInput type='number' name="user_number" value={room.user_number} onChange={handleChange} placeholder="Số người phù hợp" />
            </div>

            <div className='add_room_box_child_item'>
              <select name="is_available" value={room.is_available} onChange={handleChange} className='add_room_box_child_select'>
                <option value="" disabled>Tình trạng phòng</option>
                <option value="1">Đang trống</option>
                <option value="0">Đã cho thuê</option>
              </select>
            </div>
          </div>

          <div className='add_room_box_child'>
            <input name='images' type='file' accept="image/*" multiple onChange={handleChangeImage} />
          </div>

          <div className='add_room_box_child2'>
            {images.map((src, index) => (
              <img key={index} src={src} alt={`upload-${index}`} />
            ))}
          </div>

          <div className='add_room_box_child'>
            <textarea
              name="description"
              value={room.description}
              onChange={handleChange}
              placeholder="Mô tả chi tiết phòng"
            />
          </div>

          <div className='add_house_content_ele'>
            <BaseButton type="blue">Thêm phòng</BaseButton>
          </div>
        </div>
      </form>
    </Common>
  )
}
