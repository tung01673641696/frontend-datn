import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import './DistrictLayout.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function DistrictLayout() {

  const [district, setDistrict] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/district")
      .then((res) => res.json())
      .then((data) => setDistrict(data))
  }, [])

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
          <div className='district_card'>
            <div className='district_card_img'>
              <img src={item.district_image} />
            </div>
            <span className='district_card_name'>Quận {item?.district_name}</span>
          </div>
        ))}
      </Slider>
    </div>
  )
}