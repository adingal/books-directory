import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import { FaUser } from 'react-icons/fa'

// Context
import UserContext from '../context/UserContext'

// Firebase
import { getAuth } from 'firebase/auth'

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, dispatch } = useContext(UserContext)

  const toggle = () => setIsOpen(!isOpen)

  const logOutUser = async () => {
    const auth = getAuth()
    dispatch({ type: 'SET_LOADING' })
    auth.signOut()
    dispatch({ type: 'LOGOUT' })
  }

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
            {user && user.displayName && (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className="d-flex align-items-center" nav>
                  <FaUser />
                  <p className="mb-0 ms-2">{user.displayName}</p>
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem onClick={logOutUser}>Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </>
  )
}

export default Header
