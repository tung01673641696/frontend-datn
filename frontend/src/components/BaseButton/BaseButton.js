import React from 'react'
import "./BaseButton.scss"

const RED = "red_color"
const WHITE = "white_color"
const FILTER= "button_filter"


export default function BaseButton({ children, type, onClick }) {

  const typeObject = {
    red: RED,
    white: WHITE,
    filter: FILTER
  }

  return (
    <>
      <button className={`button ${typeObject[type]}`} onClick={onClick}>
        {children}
      </button>
    </>
  )
}
