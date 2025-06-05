import React, { useEffect, useState } from 'react'
import "./RoomNew.scss"
import CardRoom from '../../../components/CardRoom/CardRoom'
import { useNavigate } from 'react-router-dom'
import { getAllPostsByAllLandlordActive } from '../../../redux/reducers/posts'
import { useDispatch, useSelector } from 'react-redux'

export default function RoomNew() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { allPostsByAllLandlordActive } = useSelector((state) => state.postsReducer)

  useEffect(() => {
    dispatch(getAllPostsByAllLandlordActive())
  }, [])

  return (
    <div className='room'>
      <div className='room_wrap'>
        {allPostsByAllLandlordActive?.slice(0, 10).map((item) => (
          <CardRoom item={item} />
        ))}
      </div>
    </div>
  )
}