import React from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { Link } from 'gatsby'

class Navi extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="sm">
        <Navbar.Brand href="/" style={{ color: '#f44336', fontWeight: 700 }}>
          Radar
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="https://wonderleap.substack.com/subscribe/">
              ✉️ Notify me of new apps
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Navi
