import React from 'react'
import "./RoomContentNeed.scss"
import Img from '../../../assets/Images/NeedAvatar/avatar.png'

export default function RoomContentNeed() {
  return (
    <div className='room_content_need'>

      <div className='room_content_need_box'>
        <div className='room_content_need_box_left'>
          <img src={Img} />
        </div>

        <div className='room_content_need_box_right'>
          <span className='room_content_need_box_right_title'>Tìm phòng cho 4 người quanh đại học Ngoại Thương</span>
          <span className='room_content_need_box_right_common'>Loại phòng: homestay</span>
          <span className='room_content_need_box_right_common'>Số lượng người: 4</span>
          <span className='room_content_need_box_right_common'>Giá từ: 1.000.000-3.000.000đ /tháng</span>
          <span className='room_content_need_box_right_common'>Quận: Đống Đa</span>
          <span className='room_content_need_box_right_common'>Chi tiết: Phòng có điều hòa,vệ sinh khép kín,có ban công thoáng,giờ giấc tự do thoải mái</span>
          <div className='room_content_need_box_right_contact'>
            <div className='room_content_need_box_right_contact_tele'>
              <button>
                <i class="bi bi-telephone"></i>
                Liên hệ ngay
              </button>
            </div>

            <div className='room_content_need_box_right_contact_like'>
              <button>
                <i class="bi bi-heart"></i>
                Yêu thích tin đăng
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
