import React, { useEffect, useState } from 'react'
import './ListNeed.scss'
import CardNeed from '../../../components/CardNeed/CardNeed'
import BaseButton from '../../../components/BaseButton/BaseButton'
import { getAllPostsByAllCustomerActive } from '../../../redux/reducers/posts'
import { useSelector, useDispatch } from 'react-redux'

export default function ListNeed({ districtId, minPrice, maxPrice }) {
  const dispatch = useDispatch()

  const { allPostsByAllCustomerActive } = useSelector((state) => state.postsReducer)

console.log(">>>>",allPostsByAllCustomerActive)
  useEffect(() => {
    dispatch(getAllPostsByAllCustomerActive())
  }, [dispatch])

  const filtered = allPostsByAllCustomerActive.filter(item => {
    const price = Number(item.price)
    const matchDistrict = !districtId || Number(item.district_id) === Number(districtId)
    const matchPrice = (!minPrice || price > minPrice) && (!maxPrice || price <= maxPrice)
    return matchDistrict && matchPrice
  })

  return (
    <div className='list-need'>
      <h4>Danh sách nhu cầu tìm phòng</h4>

      <div className='list-need_all'>
        {filtered?.slice(0, 10).map((item) => (
          <CardNeed item={item} />
        ))}
      </div>

      <BaseButton type="red">Xem thêm</BaseButton>
    </div>
  )
}
