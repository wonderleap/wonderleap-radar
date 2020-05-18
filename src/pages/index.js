import React, { Component } from 'react'
import moment from 'moment'
import request from '../utils/graphql'

import Layout from 'components/layout'
import Table from 'components/table'

const getData = `query getData($date1: timestamptz, $date2: timestamptz) {
  sidequest_apps(where: {_and: [{name: {_is_null: false}}, {name: {_nlike: "%Unlisted%"}}, {name: {_nlike: "%test%"}}, {name: {_nlike: "%Test%"}}, {name: {_nlike: "%Sign%"}}, {name: {_nlike: "%V1%"}}, {name: {_nlike: "%1.8.0%"}}, {name: {_nlike: "%1.9.0%"}}, {name: {_nlike: "%Saber%"}}], records: {downloads: {_gte: 0}}, is_available: {_neq: false}}, order_by: {records_aggregate: {max: {downloads: desc}}}) {
    name
    sq_id
    id
    records(where: {created_at: {_gte: $date1, _lt: $date2}}, order_by: {created_at: asc}) {
      downloads
      views
      created_at
    }
  }
}
  `
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
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

    if (
      sq_apps &&
      !moment(created_at).isBefore(moment().subtract(1, 'hours'))
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

  render() {
    const { data, loading } = this.state

    return (
      <Layout location={'index'}>
        {!loading ? (
          <Table
            columns={['#', 'Name', 'Downloads', 'Views']}
            data={data || []}
          />
        ) : (
          <p>Loading...</p>
        )}
      </Layout>
    )
  }
}

export default Index
