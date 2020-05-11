import React from 'react'
import { graphql } from 'gatsby'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

import request from '../utils/graphql'

import withLocation from 'components/hoc/withLocation'
import Layout from 'components/layout'
import moment from 'moment'

const getAppInfo = `query GetData($id: uuid) {
    sidequest_apps (where: {id: {_eq: $id}}) {
        name
        created
        updated
        sq_id
        is_webxr
        image_url
        records (order_by: { created_at: asc }) {
          created_at
          downloads
          views
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
                  <img width={200} height={200} src={app.image_url} />
                  <p>Released {moment.unix(app.created / 1000).fromNow()}</p>
                  <p>Updated {moment.unix(app.updated / 1000).fromNow()}</p>
                  <p>{app.is_webxr ? 'WebXR app' : 'Native app'}</p>
                </div>
              )}
              <div class="row">
                <div className="col-sm" align="center">
                  <h2>Downloads</h2>
                  <LineChart
                    width={250}
                    height={250}
                    data={(app && app.records) || []}
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
                <div className="col-sm" align="center">
                  <h2>Views</h2>
                  <LineChart
                    width={250}
                    height={250}
                    data={(app && app.records) || []}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                  >
                    <XAxis dataKey="created_at" />
                    <YAxis dataKey="views" />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line
                      type="monotone"
                      dataKey="views"
                      stroke="#ff7300"
                      yAxisId={0}
                    />
                    {/*<Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />*/}
                  </LineChart>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    )
  }
}

export default withLocation(App)
