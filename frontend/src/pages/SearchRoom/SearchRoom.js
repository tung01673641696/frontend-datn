import React, { useState, useEffect } from 'react'
import './SearchRoom.scss'
import HeaderUser from '../../layouts/UserLayout/HeaderUser/HeaderUser'
import Footer from '../../layouts/UserLayout/FooterUser/FooterUser'
import FilterSearch from '../../layouts/SearchRoomLayout/FilterSearch/FilterSearch'
import ListRoom from '../../layouts/SearchRoomLayout/ListRoom/ListRoom'
import BaseModal from '../../components/BaseModal/BaseModal'

export default function SearchRoom() {
  const [district, setDistrict] = useState([])
  // const [isShow, setIsShow] = useState(false)

  // function handleClick() {
  //   setIsShow(true)
  // }

  // function handleClose() {
  //   setIsShow(false)
  // }

  useEffect(() => {
    fetch("http://localhost:3001/district")
      .then((res) => res.json())
      .then((data) => setDistrict(data))
  }, [])

  return (
    <div className='search-room'>
      <HeaderUser />

      <div className='search-room_wrap'>
        {/* <FilterSearch /> */}

        <ListRoom />
      </div>

      {/* <BaseModal open={isShow} title="Bộ lọc tìm kiếm" type="red" onClose={handleClose}>
        <div className='info'>
          <span className='info_title'>
            Khu vực
          </span>

          <div className='info_select'>
            <div className='info_select_ele'>
              <span>Tỉnh thành</span>

              <select>
                <option>Hà Nội</option>
              </select>
            </div>

            <div className='info_select_ele'>
              <span>Quận / huyện</span>

              <select value={district} onChange={(e) => setDistrict(e.target.value)}>
                {
                  district?.map((item) => (
                    <option value={item?.id}>{item?.district_name}</option>
                  ))
                }
              </select>
            </div>

            <div className='info_select_ele'>
              <span>Phường xã</span>

              <select>
                <option>Phường Kim Liên</option>
              </select>
            </div>
          </div>
        </div>
      </BaseModal> */}

      <Footer />
    </div>
  )
}
