import React, { Component } from 'react'
import moment from 'moment'
import request from '../utils/graphql'
import format from '../utils/numbers'

import {
  Row,
  Col,
  ButtonToolbar,
  ButtonGroup,
  Button,
  Spinner,
  Container,
  Card,
  CardDeck,
  Pagination,
  Badge,
} from 'react-bootstrap'
import Layout from 'components/layout'
import Table from 'components/table'

const getData = `query getData($date1: timestamptz, $date2: timestamptz) {
  sidequest_apps(where: {_and: [{name: {_is_null: false}}, {name: {_nlike: "%Unlisted%"}}, {name: {_nlike: "%test%"}}, {name: {_nlike: "%Test%"}}, {name: {_nlike: "%Sign%"}}, {name: {_nlike: "%V1%"}}, {name: {_nlike: "%1.8.0%"}}, {name: {_nlike: "%1.9.0%"}}, {name: {_nlike: "%Saber%"}}], records: {downloads: {_gte: 0}}, is_available: {_neq: false}}, order_by: {records_aggregate: {max: {downloads: desc}}}) {
    name
    sq_id
    id
    image_url
    is_webxr
    created_at
    records(where: {created_at: {_gte: $date1, _lt: $date2}}, order_by: {created_at: asc}) {
      downloads
      views
      created_at
    }
  }
}
  `

const getCreatedToday = `query getCreatedToday($date : timestamptz) {
  sidequest_apps(where: {created_at: {_gte: $date}}) {
    name
  }
}
`
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      addedToday: 0,
      totalDownloads: 0,
      totalViews: 0,
      dailyDownloads: [],
      dailyViews: [],
      currentPage: 1,
      data: [],
      recordsPerPage: 50,
    }
  }

  getTotals = apps => {
    let totalViews = 0
    let totalDownloads = 0

    for (const elm of apps) {
      if (elm.records.length > 0) {
        totalDownloads += elm.records[elm.records.length - 1].downloads
          ? elm.records[elm.records.length - 1].downloads
          : 0
        totalViews += elm.records[elm.records.length - 1].views
          ? elm.records[elm.records.length - 1].views
          : 0
      }
    }

    return {
      totalViews: totalViews,
      totalDownloads: totalDownloads,
    }
  }

  gotoPage = toPage => {
    let { currentPage, data, recordsPerPage } = this.state

    if (
      currentPage >= 1 &&
      currentPage <= Math.ceil(data.length / recordsPerPage)
    ) {
      this.setState({ currentPage: toPage })
      window.scroll(0, 0)
    }
  }

  componentDidMount() {
    const sq_apps = localStorage.getItem('sq_apps')

    let apps, created_at

    if (sq_apps) {
      const data = JSON.parse(sq_apps)
      apps = data.apps
      created_at = data.created_at
    }

    request({
      query: getCreatedToday,
      variables: { date: moment().format('YYYY-MM-DD') },
    }).then(data =>
      this.setState({ addedToday: data.data.sidequest_apps.length })
    )

    if (
      sq_apps &&
      !moment(created_at).isBefore(moment().subtract(10, 'minutes'))
    ) {
      this.setState({ loading: false, data: apps })
    } else {
      request({
        query: getData,
        variables: {
          date1: moment()
            .subtract(3, 'days')
            .format(),
          date2: moment()
            .add(1, 'days')
            .format(),
        },
      })
        .then(_data =>
          this.setState({ loading: false, data: _data.data.sidequest_apps })
        )
        .then(() =>
          localStorage.setItem(
            'sq_apps',
            JSON.stringify({
              apps: this.state.data,
              created_at: moment().format(),
            })
          )
        )
    }
  }

  componentDidUpdate() {
    const { data, totalDownloads, totalViews } = this.state

    if (data && data.length > 0 && totalDownloads === 0 && totalViews === 0) {
      const totalStats = this.getTotals(data)

      const totalDownloads = totalStats.totalDownloads
      const totalViews = totalStats.totalViews

      this.setState({
        totalDownloads,
        totalViews,
      })
    }
  }

  render() {
    const {
      data,
      loading,
      addedToday,
      totalDownloads,
      totalViews,
      currentPage,
      recordsPerPage,
    } = this.state

    return (
      <Layout hideFooter={loading ? true : false} location={'index'}>
        {!loading ? (
          <>
            <Container fluid style={{ marginBottom: 30 }}>
              <CardDeck>
                <Card border="dark" style={{ width: '18rem' }}>
                  <Card.Body className="text-center">
                    <Card.Title>Number of apps tracked</Card.Title>
                    <Card.Text>
                      <h2>{data.length}</h2>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card border="dark" style={{ width: '18rem' }}>
                  <Card.Body className="text-center">
                    <Card.Title>Total app downloads</Card.Title>
                    <Card.Text>
                      <h2>{format(totalDownloads)}</h2>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card border="dark" style={{ width: '18rem' }}>
                  <Card.Body className="text-center">
                    <Card.Title>Total app views</Card.Title>
                    <Card.Text>
                      <h2>{format(totalViews)}</h2>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card border="dark" style={{ width: '18rem' }}>
                  <Card.Body className="text-center">
                    <Card.Title>New apps added today</Card.Title>
                    <Card.Text>
                      <h2>{addedToday || 0}</h2>
                    </Card.Text>
                  </Card.Body>
                </Card>
                {/*
                  <Card border="dark" style={{ width: '18rem' }}>
                    <Card.Body className="text-center">
                      <Card.Title>
                        <Badge pill variant="dark">
                          💡 Tip
                        </Badge>{' '}
                        <a href="https://wonderleap.co">Monetize your game</a>
                      </Card.Title>
                      <Card.Text>
                        Learn how to monetize your game with{' '}
                        <a href="https://wonderleap.co">Wonderleap</a>.
                      </Card.Text>
                    </Card.Body>
                  </Card> 
                */}
              </CardDeck>
            </Container>

            <Container fluid style={{ marginTop: 30 }}>
              <Row>
                <Col sm="auto">
                  <h3>{'SideQuest App Ranking'}</h3>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>
                    This table shows all SideQuest titles ranked by their{' '}
                    {'Total Downloads'.toLowerCase()}.
                  </p>
                </Col>
              </Row>
            </Container>

            <Table
              columns={['Rank', '', '', 'Downloads', ' Views']}
              data={
                data.slice(
                  recordsPerPage * (currentPage - 1),
                  recordsPerPage * currentPage
                ) || []
              }
              title={'Table name'}
              startingIndex={recordsPerPage * (currentPage - 1)}
            />

            <Container
              fluid
              className="text-center"
              style={{ marginBottom: 20 }}
            >
              <Row>
                <Col>
                  <ButtonGroup size="sm">
                    <Button
                      onClick={() =>
                        this.setState({ recordsPerPage: recordsPerPage + 50 })
                      }
                    >
                      Load more
                    </Button>
                    {/*<Button
                      disabled={recordsPerPage === data.length}
                      onClick={() =>
                        this.setState({
                          currentPage: 1,
                          recordsPerPage: data.length,
                        })
                      }
                    >
                      All results
                    </Button>*/}
                  </ButtonGroup>
                </Col>
                {/*<Col>
                  <Pagination className="justify-content-end" size="sm">
                    <Pagination.Prev
                      disabled={currentPage === 1 ? true : false}
                      onClick={() => this.gotoPage(currentPage - 1)}
                    >
                      Previous {recordsPerPage}
                    </Pagination.Prev>
                    <Pagination.Item disabled>
                      {currentPage} / {Math.ceil(data.length / recordsPerPage)}
                    </Pagination.Item>
                    <Pagination.Next
                      disabled={
                        currentPage === Math.ceil(data.length / recordsPerPage)
                          ? true
                          : false
                      }
                      onClick={() => this.gotoPage(currentPage + 1)}
                    >
                      Next {recordsPerPage}
                    </Pagination.Next>
                  </Pagination>
                    </Col>*/}
              </Row>
            </Container>
          </>
        ) : (
          <div className="text-center">
            <Spinner animation="grow" />
          </div>
        )}
      </Layout>
    )
  }
}

export default Index
