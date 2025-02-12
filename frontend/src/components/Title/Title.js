import React from 'react'
import "./Title.scss"

export default function Title({ text }) {
  return (
    <div className='title'>
      <div className='title_name'>
        <h3>{text}</h3>
        <div className='line'></div>
      </div>
    </div>
  )
}