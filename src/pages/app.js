import React from 'react'
import { graphql } from 'gatsby'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

import request from '../utils/graphql'

import withLocation from 'components/hoc/withLocation'
import Layout from 'components/layout'

const getAppInfo = `query GetData($id: uuid) {
    sidequest_apps (where: {id: {_eq: $id}}) {
        name
        date_added
        sq_id
        records {
          created_at
          downloads
        }
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

    return (
      <Layout>
        <div>
          <section className="text-center">
            <div className="container">
              {!app ? (
                <p>App does not exist</p>
              ) : (
                <div>
                  <a href={`https://sdq.st/a-${app.sq_id}`}>
                    <h1> {app.name} </h1>
                  </a>
                  <p> First released on {app.date_added} </p>
                </div>
              )}

              <div className="col-xs-1" align="center">
                <LineChart
                  width={400}
                  height={400}
                  data={app.records}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <XAxis dataKey="created_at" />
                  <YAxis dataKey="downloads" />
                  <Tooltip />
                  <CartesianGrid stroke="#f5f5f5" />
                  <Line
                    type="monotone"
                    dataKey="downloads"
                    stroke="#ff7300"
                    yAxisId={0}
                  />
                  {/*<Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />*/}
                </LineChart>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    )
  }
}

export default withLocation(App)
