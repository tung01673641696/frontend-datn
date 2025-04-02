import React from 'react'
import "./BaseInput.scss"

export default function BaseInput({
  type = "text",
  min,
  name,
  placeholder,
  onChange,
  value
}) {
  return (
    <>
      <input
        type={type}
        min={min}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </>
  )
}
