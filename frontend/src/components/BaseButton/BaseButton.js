import React from 'react'
import "./BaseButton.scss"

const RED = "red_color"
const WHITE = "white_color"
const BLUE = "blue_color"
const WARNING = "warning_color"
const FILTER = "button_filter"


export default function BaseButton({ htmlType, children, type, onClick, className }) {

  const typeObject = {
    red: RED,
    white: WHITE,
    blue: BLUE,
    warning: WARNING,
    filter: FILTER
  }

  return (
    <>
      <button type={htmlType} className={`button ${typeObject[type]} ${className}`} onClick={onClick}>
        {children}
      </button>
    </>
  )
}
