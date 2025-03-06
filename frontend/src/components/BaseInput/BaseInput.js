import React from 'react'
import "./BaseInput.scss"

export default function BaseInput({
  type = "text",
  name,
  placeholder,
  onChange
}) {
  return (
    <>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  )
}
