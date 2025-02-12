import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./HeaderUser.scss"
import { Link } from 'react-router-dom';

export default function HeaderUser() {
  return (
    <div className='header'>
      <div className='header_wrap'>
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">WESITE TÌM KIẾM VÀ QUẢN LÍ PHÒNG TRỌ</Navbar.Brand>

            <Nav>
              <Link to="/login" className='header_user'>Đăng Nhập</Link>

              <span className='header_separate'>|</span>

              <Link to="/register" className='header_user'>Đăng Ký</Link>
            </Nav>

            {/* <Nav>
              <NavDropdown title="User" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Thông Tin Cá Nhân</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Cài Đặt</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Đăng Xuất</NavDropdown.Item>
              </NavDropdown>
            </Nav> */}

          </Container>
        </Navbar>
      </div>
    </div>
  )
}
