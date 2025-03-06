import React, { useState } from 'react'
import './Register.scss'
import { Link } from 'react-router-dom'
import HeaderUser from '../../layouts/UserLayout/HeaderUser/HeaderUser'
import BaseButton from '../../components/BaseButton/BaseButton'
import BaseInput from '../../components/BaseInput/BaseInput'
import { toast } from 'react-toastify'
import { validateName, validatePassword, validatePhone } from '../../utils/validate'

export default function Register() {
  const [data, setData] = useState({
    username: "",
    telephone: "",
    password: "",
    confirmPassword: "",
    role: ""
  })

  const handleChange = async (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  console.log(data)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !data.username ||
      !data.telephone ||
      !data.password ||
      !data.confirmPassword ||
      !data.role
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return
    }
    if (!validateName(data.username)) {
      toast.error("Họ và tên không đúng định dạng");
      return
    }
    if (!validatePhone(data.telephone)) {
      toast.error("Số điện thoại không đúng định dạng");
      return
    }
    if (!validatePassword(data.password)) {
      toast.error("Mật khẩu ít nhất 8 ký tự");
      return
    }
    if (data.password !== data.confirmPassword) {
      toast.error("Xác nhận sai mật khẩu")
    }
  }

  return (
    <div className='register'>
      <HeaderUser />

      <form className='register_box' onSubmit={handleSubmit}>
        <h3 className='register_title'>Đăng ký tài khoản</h3>

        <div className='register_content'>
          <div className="register_content_child">
            <BaseInput name="username" placeholder="Họ và tên" value={data.username} onChange={handleChange} />
          </div>

          <div className="register_content_child">
            <BaseInput name="telephone" placeholder="Số điện thoại" value={data.telephone} onChange={handleChange} />
          </div>

          <div className="register_content_child">
            <BaseInput type="password" name="password" placeholder="Mật khẩu" value={data.password} onChange={handleChange} />
          </div>

          <div className="register_content_child">
            <BaseInput type="password" name="confirmPassword" placeholder="Nhập lại mật khẩu" value={data.confirmPassword} onChange={handleChange} />
          </div>

          <div className='register_content_child'>
            <select name="role" value={data.role} onChange={handleChange}>
              <option value="" selected disabled>Loại tài khoản</option>
              <option value="tenant">Người thuê</option>
              <option value="landlord">Chủ nhà</option>
            </select>
          </div>

          <div className='register_content_child'>
            <BaseButton type="red" htmlType='submit'>
              Đăng ký
            </BaseButton>
          </div>

          <div className='register_link'>
            <span><Link to="/" className='register_link_decor'>Quay lại trang chủ</Link></span>
          </div>
        </div>
      </form>
    </div>
  )
}
