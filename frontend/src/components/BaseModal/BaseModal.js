import React from 'react'
import './BaseModal.scss'

const RED = "red_bg"
const BLUE = "blue_bg"

export default function BaseModal({ open, type, title, onClose, children }) {
  const typeObject = {
    red: RED,
    blue: BLUE
  }

  return (
    <>
      {
        open && (
          <div className='overlay'>
            <div className='base-modal'>
              <div className={`base-modal_header ${typeObject[type]}`}>
                <div className='base-modal_header_title'>
                  {title}
                </div>

                <div className='base-modal_header_close' onClick={onClose}>
                  <i class="bi bi-x-lg"></i>
                </div>
              </div>

              <div className='base-modal_main'>
                {children}
              </div>

            </div>
          </div>
        )
      }
    </>
  )
}
