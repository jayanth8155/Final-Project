import styled from "styled-components"
import { Link } from "react-router-dom"

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  padding: 2rem 0;
  margin-top: 2rem;
  text-align: center;
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const FooterLinks = styled.div`
  display: flex;
  gap: 1rem;
`

const FooterLink = styled(Link)`
  color: #333;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const Copyright = styled.p`
  margin: 0;
  color: #666;
`

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinks>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
        </FooterLinks>
        <Copyright>&copy; {new Date().getFullYear()} Workout Tracker. All rights reserved.</Copyright>
      </FooterContent>
    </FooterContainer>
  )
}

export default Footer

