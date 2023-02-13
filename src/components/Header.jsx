import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap'
import { FaUser } from 'react-icons/fa'

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <>
      <Navbar
        className="py-3 py-lg-4"
        container="xl"
        expand="md"
        color="dark"
        dark
      >
        <NavLink className="navbar-brand fw-bold text-uppercase" to="/">
          <h2 className="m-0">Books Directory</h2>
        </NavLink>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink to="/books" className="nav-link text-uppercase px-md-3">
                Books
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/users" className="nav-link text-uppercase px-md-3">
                Users
              </NavLink>
            </NavItem>
            {isLoggedIn && (
              <NavItem>
                <NavLink
                  to="/profile/:id"
                  className="d-flex flex-row align-items-center nav-link text-capitalize px-md-3"
                >
                  <FaUser />
                  <p className="mb-0 ms-1">Username</p>
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </>
  )
}

export default Header
