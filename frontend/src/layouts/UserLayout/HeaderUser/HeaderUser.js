import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./HeaderUser.scss"
import { Link } from 'react-router-dom';
import DropdownTenant from '../../HomeLayout/DropdownTenant/DropdownTenant';
import DropdownLandlord from '../../HomeLayout/DropdownLandlord/DropdownLandlord';

export default function HeaderUser() {
  const user = localStorage.getItem('user') === null ? null : JSON.parse(localStorage.getItem('user'));

  return (
    <div className='header'>
      <div className='header_wrap'>
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">HỆ THỐNG THUÊ VÀ CHO THUÊ PHÒNG TRỌ</Navbar.Brand>

            <Nav>
              {!user ? (
                <>
                  <Link to="/login" className='header_user'>Đăng Nhập</Link>
                  <span className='header_separate'>|</span>
                  <Link to="/register" className='header_user'>Đăng Ký</Link>
                </>
              ) : user.role_id === 1 ? (
                <DropdownTenant />
              ) : user.role_id === 2 ? (
                <DropdownLandlord />
              ) : null}
            </Nav>

          </Container>
        </Navbar>
      </div>
    </div >
  )
}
