import React, { useState, useEffect } from 'react'
import './SearchNeed.scss'
import { useDispatch, useSelector } from 'react-redux'
import HeaderUser from '../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../layouts/UserLayout/FooterUser/FooterUser'
import ListNeed from '../../layouts/SearchNeedLayout/ListNeed/ListNeed'
import { getDistrict } from '../../redux/reducers/address'

export default function SearchNeed() {
  const dispatch = useDispatch()
  const [districtId, setDistrictId] = useState('')
  const [priceNeed, setPriceNeed] = useState('')
  const { district } = useSelector((state) => state.addressReducer)

  useEffect(() => {
    dispatch(getDistrict())
  }, [dispatch])

  const priceOptions = [
    { label: 'Tất cả mức giá', value: '' },
    { label: 'Dưới 2 triệu', value: '0-2000000' },
    { label: '2 - 4 triệu', value: '2000000-4000000' },
    { label: 'Trên 4 triệu', value: '4000000-100000000' }
  ]

  const [minPrice, maxPrice] = priceNeed ? priceNeed.split('-').map(Number) : []


  return (
    <div className='search-need'>
      <HeaderUser />

      <div className='search-need-fil'>
        <div className='search-need_filter'>
          <span className='search-need_filter_title'>Bộ lọc tìm kiếm</span>

          <div className='search-need_filter_flex'>
            <div className='search-need_filter_flex_item'>
              <span>Chọn quận</span>

              <select value={districtId} onChange={(e) => setDistrictId(e.target.value)}>
                <option value="">Vui lòng chọn</option>
                {district.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>

            <div className='search-need_filter_flex_item'>
              <span>Chọn giá</span>

              <select value={priceNeed} onChange={(e) => setPriceNeed(e.target.value)}>
                {priceOptions.map((option, idx) => (
                  <option key={idx} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className='search-need_wrap'>
        <ListNeed
          districtId={districtId}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </div>

      <Footer />
    </div>
  )
}
