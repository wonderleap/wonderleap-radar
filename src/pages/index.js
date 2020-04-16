import React, { Component } from 'react'
import moment from 'moment'
import request from '../utils/graphql'

import Layout from 'components/layout'
import Table from 'components/table'

const getData = `query getData ($date1: timestamptz, $date2: timestamptz) {
    sidequest_apps(where: {_and: [{name: {_is_null: false}}, {name: {_nlike: "%Unlisted%"}}, {name: {_nlike: "%test%"}}, {name: {_nlike: "%Test%"}}, {name: {_nlike: "%Sign%"}}, {name: {_nlike: "%V1%"}}, {name: {_nlike: "%1.8.0%"}}, {name: {_nlike: "%1.9.0%"}}]}, order_by: {records_aggregate: {max: {downloads: desc}}}) {
        name
        sq_id
        id
        records (where: {created_at: {_gte: $date1, _lt: $date2}}){
          downloads
          views
        }
    }
  }
  `

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    request({
      query: getData,
      variables: {
        date1: moment()
          .subtract(2, 'days')
          .startOf('day')
          .format(),
        date2: moment().format(),
      },
    }).then(_data => this.setState({ data: _data.data.sidequest_apps }))
  }

  render() {
    const { data } = this.state

    console.log(data)

    return (
      <Layout location={'index'}>
        <Table
          columns={['#', 'Name', 'Downloads', 'Views']}
          data={data || []}
        />
      </Layout>
    )
  }
}

export default Index
