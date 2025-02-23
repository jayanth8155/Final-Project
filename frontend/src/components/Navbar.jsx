"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { AuthContext } from "../context/AuthContext"

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 2rem;
  background-color: #f8f9fa;
`

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #333;
`

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;

  &:hover {
    color: #007bff;
  }
`

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext)

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">Workout Tracker</Logo>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/profile">Profile</NavLink>
              <NavLink to="/" onClick={logout}>
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
          {/* <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink> */}
        </NavLinks>
      </NavContainer>
    </Nav>
  )
}

export default Navbar

