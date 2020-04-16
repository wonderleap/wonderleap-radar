import React from 'react'
import { graphql } from 'gatsby'

import request from '../utils/graphql'

import withLocation from 'components/hoc/withLocation'
import Layout from 'components/layout'

const getAppInfo = `query GetData($id: uuid) {
    sidequest_apps (where: {id: {_eq: $id}}) {
        name
        date_added
    }
}`

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      app: {},
    }
  }

  componentWillMount() {
    request({
      query: getAppInfo,
      variables: { id: this.props.search.id },
    }).then(_data =>
      this.setState({
        app:
          _data &&
          _data.data &&
          _data.data.sidequest_apps &&
          _data.data.sidequest_apps[0],
      })
    )
  }

  render() {
    const { app } = this.state

    console.log(app)

    return (
      <Layout>
        {!app ? (
          <p>App does not exist</p>
        ) : (
          <div>
            <h1> {app.name} </h1>
            <p> {app.date_added} </p>
          </div>
        )}
      </Layout>
    )
  }
}

export default withLocation(App)
