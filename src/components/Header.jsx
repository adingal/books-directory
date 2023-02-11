import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'
import { FaUser } from 'react-icons/fa'

function Header() {
  const [isOpen, setIsOpen] = useState(false)

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
        <Link className="navbar-brand fw-bold text-uppercase" to="/">
          <h2 className="m-0">Books Directory</h2>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <Link to="/books" className="nav-link text-uppercase px-md-3">
                Books
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/users" className="nav-link text-uppercase px-md-3">
                Users
              </Link>
            </NavItem>
            <NavItem>
              <NavLink href="/users">
                <FaUser />
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </>
  )
}

export default Header
