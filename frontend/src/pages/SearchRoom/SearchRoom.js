import React, { useState, useEffect } from 'react'
import './SearchRoom.scss'
import HeaderUser from '../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../layouts/UserLayout/FooterUser/FooterUser'
import ListRoom from '../../layouts/SearchRoomLayout/ListRoom/ListRoom'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDistrict } from '../../redux/reducers/address'

export default function SearchRoom() {
  const dispatch = useDispatch()
  const { district_id } = useParams()
  const [districtId, setDistrictId] = useState('')
  const [priceRoom, setPriceRoom] = useState('')
  const { district } = useSelector((state) => state.addressReducer)

  const priceOptions = [
    { label: 'Tất cả mức giá', value: '' },
    { label: 'Dưới 2 triệu', value: '0-2000000' },
    { label: '2 - 4 triệu', value: '2000000-4000000' },
    { label: 'Trên 4 triệu', value: '4000000-100000000' }
  ]

  const [minPrice, maxPrice] = priceRoom ? priceRoom.split('-').map(Number) : []

  useEffect(() => {
    dispatch(getDistrict())
  }, [])

  return (
    <div className='search-room'>
      <HeaderUser />

      <div className='search-room-fil'>
        <div className='search_room_filter'>
          <span className='search_room_filter_title'>Bộ lọc tìm kiếm</span>

          <div className='search_room_filter_flex'>
            <div className='search_room_filter_flex_item'>
              <span>Chọn quận</span>

              <select value={districtId} onChange={(e) => setDistrictId(e.target.value)}>
                <option value="">Vui lòng chọn</option>
                {district.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>

            <div className='search_room_filter_flex_item'>
              <span>Chọn giá</span>

              <select value={priceRoom} onChange={(e) => setPriceRoom(e.target.value)}>
                {priceOptions.map((option, idx) => (
                  <option key={idx} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className='search-room_wrap'>
        <ListRoom districtId={districtId || district_id}
          minPrice={minPrice}
          maxPrice={maxPrice} />
      </div>

      <Footer />
    </div>
  )
}
