import React, { useEffect, useState } from 'react'
import "./EditRoom.scss"
import Common from '../../../../layouts/LandlordLayout/Common/Common'
import BaseInput from '../../../../components/BaseInput/BaseInput'
import BaseButton from '../../../../components/BaseButton/BaseButton'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getOneRoom } from '../../../../redux/reducers/room'
import { houseByOwner } from '../../../../redux/reducers/house'

export default function EditRoom() {
  const params = useParams()
  const dispatch = useDispatch()
  const id_room = params.id
  const user = JSON.parse(localStorage.getItem("user"))
  const id_user = user.id

  const [room, setRoom] = useState({
    house_id: "",
    room_type: "",
    name: "",
    floor: "",
    price: "",
    price_deposit: "",
    area: "",
    user_number: "",
    images: [],
    description: "",
    is_available: ""
  })

  const [previewImages, setPreviewImages] = useState([]);

  const { oneRoom } = useSelector((state) => state.roomReducer)

  console.log("onerooom", oneRoom)
  const { listHouseByOwner } = useSelector((state) => state.houseReducer)

  useEffect(() => {
    dispatch(getOneRoom(id_room))
  }, [id_room])

  useEffect(() => {
    dispatch(houseByOwner(id_user))
  }, [id_user])

  useEffect(() => {
    if (oneRoom) {
      setRoom({
        house_id: oneRoom?.house_id || "",
        room_type: oneRoom?.room_type || "",
        name: oneRoom?.name || "",
        floor: oneRoom?.floor || "",
        price: oneRoom?.price || "",
        price_deposit: oneRoom?.price_deposit || "",
        area: oneRoom?.area || "",
        user_number: oneRoom?.user_number || "",
        images: [],
        description: oneRoom?.description || "",
        is_available: oneRoom?.is_available?.toString() || ""
      })

      console.log("eeeeeeeeeeeeee", room)

      if (Array.isArray(oneRoom.images) && oneRoom.images.length > 0) {
        setPreviewImages(oneRoom.images); // hiển thị ảnh cũ
      }
    }
  }, [oneRoom])

  const handleImageChange = (event) => {
    const files = event.target.files;
    const newImages = [...room.images]; // Giữ ảnh cũ
    const imageUrls = [...previewImages]; // Giữ ảnh xem trước cũ

    for (let i = 0; i < files.length; i++) {
      newImages.push(files[i]);  // Thêm file mới
      imageUrls.push(URL.createObjectURL(files[i])); // Tạo URL xem trước
    }

    setRoom((prevRoom) => ({
      ...prevRoom,
      images: newImages  // Cập nhật danh sách ảnh
    }));

    setPreviewImages(imageUrls);  // Cập nhật ảnh xem trước
  };

  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value })
  }

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
      image: "",
      description: room.description,
      is_available: room.is_available
    }


    console.log("data", data)
  }

  return (
    <Common>
      <form className='edit_room' onSubmit={handleSubmit}>
        <span className='edit_room_title'>Cập nhật phòng</span>

        <div className='edit_room_box'>
          <div className='edit_room_box_child'>
            <div className='edit_room_box_child_item1'>
              <select name="house_id" value={room.house_id} onChange={handleChange} className='edit_room_box_child_select'>
                <option value="" disabled>Chọn nhà</option>
                {listHouseByOwner.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className='edit_room_box_child_item1'>
              <BaseInput type='number' name="name" value={room.name} onChange={handleChange} placeholder="Tên phòng" />
            </div>

            <div className='edit_room_box_child_item1'>
              <select name="room_type" value={room.room_type} onChange={handleChange} className='edit_room_box_child_select'>
                <option value="" disabled>Loại phòng</option>
                <option value="trọ thường">Trọ thường</option>
                <option value="homestay">Homestay</option>
                <option value="chung cư mini">Chung cư mini</option>
              </select>
            </div>
          </div>

          <div className='edit_room_box_child'>
            <div className='edit_room_box_child_item'>
              <BaseInput type='number' min="1" name="floor" value={room.floor} onChange={handleChange} placeholder="Tầng" />
            </div>

            <div className='edit_room_box_child_item'>
              <BaseInput type='number' min="1" name="price" value={room.price} onChange={handleChange} placeholder="Giá phòng" />
            </div>
          </div>

          <div className='edit_room_box_child'>
            <div className='add_room_box_child_item'>
              <BaseInput type='number' min="1" name="price_deposit" value={room.price_deposit} onChange={handleChange} placeholder="Tiền cọc" />
            </div>

            <div className='edit_room_box_child_item'>
              <BaseInput type='number' min="1" name="area" value={room.area} onChange={handleChange} placeholder="Diện tích" />
            </div>
          </div>

          <div className='edit_room_box_child'>
            <div className='edit_room_box_child_item'>
              <BaseInput type='number' name="user_number" value={room.user_number} onChange={handleChange} placeholder="Số người phù hợp" />
            </div>

            <div className='edit_room_box_child_item'>
              <select name="is_available" value={room.is_available} onChange={handleChange} className='edit_room_box_child_select'>
                <option value="" disabled>Tình trạng phòng</option>
                <option value="1">Đang trống</option>
                <option value="0">Đã cho thuê</option>
              </select>
            </div>
          </div>

          <div className='edit_room_box_child'>
            <input name='images' value="" type='file' accept="image/*" multiple onChange={handleImageChange} />
          </div>

          <div className='edit_room_box_child2'>
            {previewImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`preview-${index}`}
                style={{ width: "100px", height: "100px", margin: "5px" }}
              />
            ))}
          </div>

          <div className='edit_room_box_child'>
            <textarea
              name="description"
              value={room.description}
              onChange={handleChange}
              placeholder="Mô tả chi tiết phòng"
            />
          </div>

          <div className='edit_house_content_ele'>
            <BaseButton type="blue">Cập nhật phòng</BaseButton>
          </div>
        </div>
      </form>
    </Common>
  )
}
