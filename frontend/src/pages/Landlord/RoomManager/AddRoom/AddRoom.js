import React, { useEffect, useState } from 'react'
import "./AddRoom.scss"
import Common from '../../../../layouts/LandlordLayout/Common/Common'
import BaseInput from '../../../../components/BaseInput/BaseInput'
import BaseButton from '../../../../components/BaseButton/BaseButton'
import { useDispatch, useSelector } from 'react-redux'
import { addHouse } from '../../../../redux/reducers/house'
import { useNavigate } from 'react-router-dom'

export default function AddRoom() {
  const [images, setImages] = useState([])

  const handleChangeImage = (event) => {
    const files = event.target.files
    const imageArray = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        imageArray.push(reader.result);
        if (imageArray.length === files.length) {
          setImages(imageArray);
        }
      };

      reader.readAsDataURL(file);
    }
  }

  return (
    <Common>
      <form className='add_room'>
        <span className='add_room_title'>Thêm phòng</span>

        <div className='add_room_box'>
          <div className='add_room_box_child'>
            <div className='add_room_box_child_item'>
              <BaseInput placeholder="Tên phòng" />
            </div>

            <div className='add_room_box_child_item'>
              <select>
                <option>Loại phòng</option>
                <option>Trọ thường</option>
                <option>Homestay</option>
                <option>Chung cư mini</option>
              </select>
            </div>

            <div className='add_room_box_child_item'>
              <BaseInput placeholder="Tầng" />
            </div>
          </div>

          <div className='add_room_box_child'>
            <div className='add_room_box_child_item2'>
              <BaseInput placeholder="Giá phòng" />
            </div>

            <div className='add_room_box_child_item2'>
              <BaseInput placeholder="Tiền cọc" />
            </div>
          </div>

          <div className='add_room_box_child'>
            <div className='add_room_box_child_item2'>
              <BaseInput placeholder="Diện tích" />
            </div>

            <div className='add_room_box_child_item2'>
              <BaseInput placeholder="Số người phù hợp" />
            </div>
          </div>

          <div className='add_room_box_child'>
            <input type='file' multiple onChange={handleChangeImage} />
          </div>

          <div className='add_room_box_child'>
            {images.map((src, index) => (
              <img key={index} src={src} alt={`upload-${index}`} width="125" height="120" />
            ))}
          </div>
          
          <div className='add_room_box_child'>
            <textarea
              onChange=""
              placeholder="Mô tả chi tiết phòng"
            />
          </div>

          <div className='add_room_box_child'>
            <select className='add_room_box_child_select'>
              <option>Đang trống</option>
              <option>Đã cho thuê</option>
            </select>
          </div>

          <div className='add_house_content_ele'>
            <BaseButton type="blue">Thêm phòng</BaseButton>
          </div>
        </div>
      </form>
    </Common>
  )
}
