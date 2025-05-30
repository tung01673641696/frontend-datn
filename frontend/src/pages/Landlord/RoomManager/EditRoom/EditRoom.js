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
import { editRoom } from '../../../../redux/reducers/room'

export default function EditRoom() {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id_room = params.id
  const user = JSON.parse(localStorage.getItem("user"))
  const id_user = user.id

  const [oldImages, setOldImages] = useState([]);
  const [newImages, setNewImages] = useState([]);


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
    status: ""
  })
  const [images, setImages] = useState([])
  const allImages = [...oldImages, ...newImages];

  const { oneRoom } = useSelector((state) => state.roomReducer)
  console.log("one", oneRoom)
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
        description: oneRoom?.description || "",
        status: oneRoom?.status || ""
      });


      let imgs = oneRoom.image;
      if (typeof imgs === 'string') {
        try {
          imgs = JSON.parse(imgs);
        } catch (e) {
          imgs = [imgs];
        }
      }

      if (Array.isArray(imgs)) {
        const convertedImages = imgs.map(link => {
          if (link.includes("imgur.com")) {
            const id = link.split("/").pop();
            return `https://i.imgur.com/${id}.jpg`;
          }
          return link;
        });

        setOldImages(convertedImages);
      } else {
        setOldImages([]);
      }

      setNewImages([]);

    }
  }, [oneRoom])

  const handleChangeImage = (event) => {
    const files = Array.from(event.target.files);

    if (files.length + oldImages.length + newImages.length > 4) {
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

    Promise.all(promises).then((imgs) => {
      setNewImages((prev) => [...prev, ...imgs]);
    });
  };

  const handleRemoveImage = (index, isOld) => {
    if (isOld) {
      const updated = [...oldImages];
      updated.splice(index, 1);
      setOldImages(updated);
    } else {
      const updated = [...newImages];
      updated.splice(index, 1);
      setNewImages(updated);
    }
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
      image: JSON.stringify(allImages),
      description: room.description,
      status: room.status
    }

    if (
      !room.house_id ||
      !room.room_type ||
      !room.name ||
      !room.floor ||
      !room.price ||
      !room.price_deposit ||
      !room.area ||
      !room.user_number ||
      !room.description ||
      room.status === ""
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return
    }

    if (allImages.length === 0) {
      toast.error("Vui lòng chọn ít nhất 1 ảnh");
      return;
    }

    const updatedData = {
      ...room,
      image: JSON.stringify(allImages)
    };

    try {
      const res = await dispatch(editRoom({ roomId: id_room, data: updatedData }))
      if (res.payload.data.error) {
        toast.error(res.payload.data.error)

      } else {
        navigate(`/landlord/room-manager`)
      }
    } catch (error) {
      toast.error("Cập nhật phòng thất bại")
    }
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
              <select name="status" value={room.status} onChange={handleChange} className='edit_room_box_child_select'>
                <option value="" disabled>Tình trạng phòng</option>
                <option value="available">Đang trống</option>
                <option value="reserved">Đang cọc</option>
                <option value="rented">Đang ở</option>
              </select>
            </div>
          </div>

          <div className='edit_room_box_child'>
            <input name='images' type='file' accept="image/*" multiple onChange={handleChangeImage} />
          </div>

          <div className='edit_room_box_child2'>
            {oldImages.map((src, index) => (
              <div key={`old-${index}`} style={{ position: 'relative' }}>
                <img src={src} alt="old" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                <button
                  type="button" onClick={() => handleRemoveImage(index, true)}
                  style={{
                    position: 'absolute',
                    top: '0',
                    right: '10px',
                    background: 'rgba(0, 0, 0, 0.6)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    lineHeight: '24px',
                    textAlign: 'center',
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            {newImages.map((src, index) => (
              <div key={`new-${index}`} style={{ position: 'relative' }}>
                <img src={src} alt="new" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                <button type="button" onClick={() => handleRemoveImage(index, false)}
                  style={{
                    position: 'absolute',
                    top: '0',
                    right: '10px',
                    background: 'rgba(0, 0, 0, 0.6)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    lineHeight: '24px',
                    textAlign: 'center',
                  }}
                >
                  ×
                </button>
              </div>
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
