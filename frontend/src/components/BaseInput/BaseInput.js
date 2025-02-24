import React from 'react'
import "./BaseInput.scss"

export default function BaseInput({
  type = "text",
  placeholder,
  onChange
}) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  )
}
