import React, { useEffect, useState } from 'react'
import "./ViewRoom.scss"
import Common from '../../../../layouts/LandlordLayout/Common/Common'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getOneRoom } from '../../../../redux/reducers/room'
import { Link } from 'react-router-dom'

export default function ViewRoom() {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id_room = params.id
  const { oneRoom } = useSelector((state) => state.roomReducer)

  console.log(">>>>>", oneRoom)

  useEffect(() => {
    dispatch(getOneRoom(id_room))
  }, [id_room])

  return (
    <Common>
      <form className='view_room'>
        <span className='view_room_title'>Thông tin phòng {oneRoom?.name} - Nhà {oneRoom?.house_name}</span>
        <div className='view_room_box'>
          <div className='view_room_box_child'>
            <div className='view_room_box_child_item'>
              <span className='view_room_box_child_item_title'>Kiểu phòng:</span>
              <span>{oneRoom?.room_type}</span>
            </div>

            <div className='view_room_box_child_item'>
              <span className='view_room_box_child_item_title'>Tầng:</span>
              <span>{oneRoom?.floor}</span>
            </div>

            <div className='view_room_box_child_item'>
              <span className='view_room_box_child_item_title'>Diện tích:</span>
              <span>{oneRoom?.area}m2</span>
            </div>
          </div>

          <div className='view_room_box_child'>
            <div className='view_room_box_child_item'>
              <span className='view_room_box_child_item_title'>Giá phòng:</span>
              <span>{oneRoom.price ? `${Number(oneRoom.price).toLocaleString('vi-VN')}đ` : "Đang cập nhật"}</span>
            </div>

            <div className='view_room_box_child_item'>
              <span className='view_room_box_child_item_title'>Tiền cọc:</span>
              <span>{oneRoom.price ? `${Number(oneRoom.price).toLocaleString('vi-VN')}đ` : "Đang cập nhật"}</span>
            </div>

            <div className='view_room_box_child_item'></div>
          </div>

          <div className='view_room_box_child'>
            <div className='view_room_box_child_item'>
              <span className='view_room_box_child_item_title'>Số người ở tối đa:</span>
              <span>{oneRoom?.user_number}</span>
            </div>

            <div className='view_room_box_child_item'>
              <span className='view_room_box_child_item_title'>Số người ở hiện tại:</span>
              <span></span>
            </div>

            <div className='view_room_box_child_item'>
              <span className='view_room_box_child_item_title'>Tình trạng phòng:</span>
              <span>
                {oneRoom.status === 'available' && (
                  <span style={{ color: 'red' }}>Phòng đang trống</span>
                )}
                {oneRoom.status === 'reserved' && (
                  <span style={{ color: 'orange' }}>Đang được giữ chỗ</span>
                )}
                {oneRoom.status === 'rented' && (
                  <span style={{ color: 'green' }}>Phòng đã thuê</span>
                )}
              </span>
            </div>
          </div>

          <div className='view_room_box_child2'>
            <div className='view_room_box_child2_title'>Ảnh phòng</div>
            <div>
              {(() => {
                try {
                  const raw = oneRoom?.image || "[]";
                  const cleaned = raw.replace(/\\/g, '');
                  const urls = JSON.parse(cleaned);

                  const toDirectImgurLink = (url) => {
                    if (url.includes("imgur.com") && !url.includes("i.imgur.com")) {
                      const id = url.split("/").pop();
                      return `https://i.imgur.com/${id}.jpg`;
                    }
                    return url;
                  };

                  return urls.map((url, index) => (
                    <img
                      key={index}
                      src={toDirectImgurLink(url)}
                      alt={`room-${index}`}
                      style={{ width: '150px', height: '150px', marginRight: '10px', marginTop: '20px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                  ));
                } catch (err) {
                  console.error('Lỗi parse ảnh:', err);
                  return <div style={{ color: 'red' }}>Không thể hiển thị ảnh</div>;
                }
              })()}
            </div>
          </div>
          <div className='view_room_box_child2'>
            <div className='view_room_box_child2_title'>Mô tả</div>
            <div style={{ whiteSpace: 'pre-line' }}>{oneRoom?.description?.replace(/\\n/g, '\n')}</div>
          </div>

          <div className='view_room_box_child3'>
            <Link className='view_room_box_child3_back' to="#" onClick={() => navigate(-1)}>Quay lại</Link>
          </div>
        </div>
      </form>
    </Common>
  )
}
