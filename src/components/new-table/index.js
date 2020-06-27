import React from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Badge,
  CardDeck,
  CardGroup,
  Button,
} from 'react-bootstrap'
import format from '../../utils/numbers'
import moment from 'moment'

function NewTable(props) {
  const { columns, data, title, startingIndex } = props

  return (
    <Row style={{ marginBottom: 10 }}>
      {data &&
        data.map((elm, index) => {
          return (
            <Col xs="auto" sm="auto" md={4} lg={4} style={{ marginBottom: 5 }}>
              <Card style={{ height: '100%' }}>
                <Card.Img variant="top" src={elm.image_url} />
                <Card.Body>
                  <Card.Title>
                    <a href={`https://sidequestvr.com/app/${elm.sq_id}`}>
                      <h6>
                        <Badge pill variant="dark">
                          New
                        </Badge>{' '}
                        {elm.name}
                      </h6>
                    </a>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
    </Row>
  )
}

export default NewTable
