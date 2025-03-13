import React, { useState } from 'react'
import './Register.scss'
import { Link } from 'react-router-dom'
import HeaderUser from '../../layouts/UserLayout/HeaderUser/HeaderUser'
import BaseButton from '../../components/BaseButton/BaseButton'
import BaseInput from '../../components/BaseInput/BaseInput'
import { toast } from 'react-toastify'
import { validateName, validatePassword, validatePhone } from '../../utils/validate'
import UserApi from '../../api/UserApi'

export default function Register() {
  const [dataForm, setDataForm] = useState({
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: ""
  })

  const data = {
    name: dataForm.username,
    phone: dataForm.phone,
    password: dataForm.password,
    role_id: dataForm.role,
  }

  console.log("data", data)

  const handleChange = async (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });

    if (dataForm.phone.length === 10) {
      try {
        const response = await UserApi.checkPhone({ phone: data.phone })

        if (response.data.exists) {
          toast.error("hihi")
        }
      } catch (error) {
        console.error("Lỗi kiểm tra số điện thoại", error);
        toast.error("Lỗi server, vui lòng thử lại.");
      }
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !dataForm.username ||
      !dataForm.phone ||
      !dataForm.password ||
      !dataForm.confirmPassword ||
      !dataForm.role
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return
    }
    if (!validateName(dataForm.username)) {
      toast.error("Họ và tên không đúng định dạng");
      return
    }
    if (!validatePhone(dataForm.phone)) {
      toast.error("Số điện thoại không đúng định dạng");
      return
    }
    if (!validatePassword(dataForm.password)) {
      toast.error("Mật khẩu ít nhất 8 ký tự");
      return
    }
    if (dataForm.password !== dataForm.confirmPassword) {
      toast.error("Xác nhận sai mật khẩu")
      return
    }

  }

  return (
    <div className='register'>
      <HeaderUser />

      <form className='register_box' onSubmit={handleSubmit}>
        <h3 className='register_title'>Đăng ký tài khoản</h3>

        <div className='register_content'>
          <div className="register_content_child">
            <BaseInput name="username" placeholder="Họ và tên" value={dataForm.username} onChange={handleChange} />
          </div>

          <div className="register_content_child">
            <BaseInput name="phone" placeholder="Số điện thoại" value={dataForm.phone} onChange={handleChange} />
          </div>

          <div className="register_content_child">
            <BaseInput type="password" name="password" placeholder="Mật khẩu" value={dataForm.password} onChange={handleChange} />
          </div>

          <div className="register_content_child">
            <BaseInput type="password" name="confirmPassword" placeholder="Nhập lại mật khẩu" value={dataForm.confirmPassword} onChange={handleChange} />
          </div>

          <div className='register_content_child'>
            <select name="role" value={dataForm.role} onChange={handleChange}>
              <option value="" selected disabled>Loại tài khoản</option>
              <option value="1">Người thuê</option>
              <option value="2">Chủ nhà</option>
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
