import React from 'react'
import "./BaseButton.scss"

const RED = "red_color"
const WHITE = "white_color"
const BLUE = "blue_color"
const WARNING = "warning_color"
const FILTER = "button_filter"
const GREEN = "green_color"

export default function BaseButton({ htmlType, children, type, onClick, className }) {
  const typeObject = {
    red: RED,
    white: WHITE,
    blue: BLUE,
    warning: WARNING,
    green: GREEN,
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
