import React, { useState } from 'react'
import './Login.scss'
import HeaderUser from '../../layouts/UserLayout/HeaderUser/HeaderUser'
import { Link, useNavigate } from 'react-router-dom'
import BaseButton from '../../components/BaseButton/BaseButton'
import BaseInput from '../../components/BaseInput/BaseInput'
import { toast } from 'react-toastify'
import { validatePhone, validatePassword } from '../../utils/validate'
import { login } from '../../redux/reducers/user'
import { useDispatch, useSelector } from 'react-redux'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, user } = useSelector((state) => state.userReducer)

  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      phone: phone,
      password: password
    }

    if (!phone || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin")
      return
    }
    if (!validatePhone(phone)) {
      toast.error("Số điện thoại không đúng định dạng");
      return
    }
    if (!validatePassword(password)) {
      toast.error("Mật khẩu ít nhất 8 ký tự");
      return
    }
    try {
      const res = await dispatch(login(data));
      console.log('res',res)
      if (res.payload.data) {
        localStorage.setItem("access_Token", res.payload.data.token)
        localStorage.setItem("user", JSON.stringify(res.payload.data.user))
        //update state auth trong redux

        if (res.payload.data.user.role_id === 1) {
          navigate(`/`)
        }
        else if (res.payload.data.user.role_id === 2) {
          navigate(`/landlord/dashboard`)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='login'>
      <HeaderUser />

      <form className='login_box' onSubmit={handleSubmit}>
        <h3 className='login_title'>Đăng nhập</h3>

        <div className='login_content'>
          <div className="login_content_child">
            <BaseInput type='text' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Số điện thoại" />
          </div>

          <div className="login_content_child">
            <BaseInput type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu" />
          </div>

          <div className='login_content_child'>
            <BaseButton type="red">
              Đăng nhập
            </BaseButton>
          </div>

          <div className='login_link'>
            <span><Link to="/" className='login_link_decor'>Quay lại trang chủ</Link></span>
          </div>
        </div>
      </form>
    </div>
  )
}
