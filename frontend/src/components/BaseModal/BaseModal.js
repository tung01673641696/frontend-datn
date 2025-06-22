import React from 'react'
import './BaseModal.scss'
import BaseButton from '../BaseButton/BaseButton'

const RED = "red_bg"
const BLUE = "blue_bg"

export default function BaseModal({
  open,
  type,
  title,
  content,
  onCancel,
  onConfirm,
  width
}) {
  const typeObject = {
    red: RED,
    blue: BLUE
  }

  return (
    <>
      {
        open && (
          <div className='overlay'>
            <div className='base-modal' style={{ width: width || "30%" }}>
              <div className={`base-modal_header ${typeObject[type]}`}>
                <div className='base-modal_header_title'>
                  {title}
                </div>

                <div className='base-modal_header_close' onClick={onCancel}>
                  <i class="bi bi-x-lg"></i>
                </div>
              </div>

              <div className='base-modal_main'>
                {content}
              </div>

              <div className='base-modal_footer'>
                <BaseButton type="white" onClick={onCancel}>Hủy</BaseButton>
                <BaseButton type={type} onClick={onConfirm}>Xác nhận</BaseButton>
              </div>
            </div>
          </div>
        )
      }

    </>
  )
}
