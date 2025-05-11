import React, { useState, useEffect } from 'react'
import "./RoomNeed.scss"
import CardNeed from '../../../components/CardNeed/CardNeed'
import { useNavigate } from 'react-router-dom'
import BaseButton from '../../../components/BaseButton/BaseButton'
import { getAllPostsByAllCustomer } from '../../../redux/reducers/posts'
import { useDispatch, useSelector } from 'react-redux'

export default function RoomNeed() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { allPostsByAllCustomer } = useSelector((state) => state.postsReducer)
  console.log(">>>>>>>>>", allPostsByAllCustomer)

  useEffect(() => {
    dispatch(getAllPostsByAllCustomer())
  }, [])

  function handleClick() {
    navigate(`/search-need`)
    window.scrollTo(0, 0)
  }

  return (
    <div className='room-need'>
      <div className='room-need_wrap'>
        {allPostsByAllCustomer?.slice(0, 6).map((item) => (
          <CardNeed item={item} />
        ))}
      </div>
      <BaseButton type="red" onClick={() => handleClick()}>Xem thêm</BaseButton>
    </div>
  )
}
