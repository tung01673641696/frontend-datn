import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./HeaderUser.scss"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dropdown from '../../HomeLayout/Dropdown/Dropdown';

export default function HeaderUser() {
  const { user } = useSelector((state) => state.userReducer)

  console.log("user", user)
  return (
    <div className='header'>
      <div className='header_wrap'>
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">WESITE TÌM KIẾM VÀ QUẢN LÍ PHÒNG TRỌ</Navbar.Brand>

            <Nav>
              {!user ? (
                <>
                  <Link to="/login" className='header_user'>Đăng Nhập</Link>

                  <span className='header_separate'>|</span>

                  <Link to="/register" className='header_user'>Đăng Ký</Link>
                </>
              ) : (
                <>
                  <Dropdown />
                </>
              )}
            </Nav>

          </Container>
        </Navbar>
      </div>
    </div>
  )
}
