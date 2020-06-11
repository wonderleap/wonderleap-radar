import { Link } from 'gatsby'
import React from 'react'
import { Navbar } from 'react-bootstrap'
import './style.scss'

const Footer = ({ hide, author, title }) =>
  !hide && (
    <Navbar bg="light" expand="lg" className="justify-content-center">
      <Navbar.Brand>
        <p>By Wonderleap with ❤️</p>
      </Navbar.Brand>
    </Navbar>
  )

export default Footer
