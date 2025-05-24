import React, { useEffect, useState } from 'react'
import './ListRoom.scss'
import CardRoom2 from '../../../components/CardRoom2/CardRoom2'
import BaseButton from '../../../components/BaseButton/BaseButton'
import { getAllPostByLandlordActiveByDistrict } from '../../../redux/reducers/posts'
import { useSelector, useDispatch } from 'react-redux'

export default function ListRoom({ districtId }) {
  const dispatch = useDispatch()
  const { allPostsByLandlordActiveByDistrict } = useSelector((state) => state.postsReducer)

  useEffect(() => {
    if (districtId) {
      dispatch(getAllPostByLandlordActiveByDistrict(districtId))
    }
  }, [districtId])

  console.log("huhu", allPostsByLandlordActiveByDistrict)

  return (
    <div className='list-room'>
      <h4>Danh sách phòng</h4>

      <div className='list-room_all'>
        {allPostsByLandlordActiveByDistrict?.slice(0, 10).map((item) => (
          <CardRoom2 item={item} />
        ))}
      </div>

      <BaseButton type="red">Xem thêm</BaseButton>
    </div>
  )
}
