import React from 'react'
import "./BaseButton.scss"

const RED = "red_color"
const WHITE = "white_color"
const BLUE = "blue_color"
const WARNING = "warning_color"
const FILTER = "button_filter"


export default function BaseButton({ htmlType, children, type, onClick }) {

  const typeObject = {
    red: RED,
    white: WHITE,
    blue: BLUE,
    warning: WARNING,
    filter: FILTER
  }

  return (
    <>
      <button type={htmlType} className={`button ${typeObject[type]}`} onClick={onClick}>
        {children}
      </button>
    </>
  )
}
