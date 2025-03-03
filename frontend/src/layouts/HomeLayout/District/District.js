import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import './District.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDistrict } from '../../../redux/reducers/address';


export default function District() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { district } = useSelector((state) => state.addressReducer)

  useEffect(() => {
    dispatch(getDistrict())
  }, [])

  function handleClick() {
    navigate(`/search-room`)
  }

  const settings = {
    className: "center",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    rows: 2,
    slidesToScroll: 1,

  };

  return (
    <div className='district'>
      <Slider {...settings}>
        {district?.map((item) => (
          <div className='district_card' onClick={() => handleClick()}>
            <div className='district_card_img'>
              <img src={item.image} />
            </div>
            <span className='district_card_name'>{item?.name}</span>
          </div>
        ))}
      </Slider>
    </div>
  )
}