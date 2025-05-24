import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import './Service.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Img from '../../../assets/Images/Service/service.png'

export default function Service() {
  const service = [
    {
      id: 1,
      name: "Đổi nước"
    },
    {
      id: 2,
      name: "Đổi ga"
    },
    {
      id: 3,
      name: "Giặt là"
    },
    {
      id: 4,
      name: "Sửa chữa"
    },
    {
      id: 5,
      name: "Vận chuyển"
    },
    {
      id: 6,
      name: "Thiết bị phòng cháy chữa cháy"
    },
  ]

  const settings = {
    className: "center",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    rows: 1,
    slidesToScroll: 1,
  };

  return (
    <div className='service'>
      <Slider {...settings}>
        {service?.map((item) => (
          <div key={item.id} className='service_card'>
            <div className='service_card_img'>
              <img src={Img} />
            </div>
            <span className='service_card_name'>{item?.name}</span>
          </div>
        ))}
      </Slider>
    </div>
  )
}
