import React from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { Link } from 'gatsby'

class Navi extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="lg" fixed="top">
        <Navbar.Brand>Radar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-primary">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Navi
