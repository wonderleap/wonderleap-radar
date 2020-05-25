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
          score
          clicks
        }
    }
}`

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      app: {},
      dailyViews: [],
      dailyDownloads: [],
    }
  }

  componentWillMount() {
    request({
      query: getAppInfo,
      variables: { id: this.props.search.id },
    })
      .then(_data =>
        this.setState({
          app:
            _data &&
            _data.data &&
            _data.data.sidequest_apps &&
            _data.data.sidequest_apps[0],
        })
      )
      .then(() => {
        this._getDailyViews(this.state.app.records)
        this._getDailyDownloads(this.state.app.records)
      })
  }

  _getDailyViews(dataset) {
    let updatedDataset = []

    for (let index = 0; index < dataset.length; index++) {
      updatedDataset.push({
        views:
          index === 0
            ? 0
            : Math.max(0, dataset[index].views - dataset[index - 1].views),
        created_at: dataset[index].created_at,
      })
    }

    console.log(updatedDataset)

    this.setState({
      dailyViews: updatedDataset,
    })
  }

  _getDailyDownloads(dataset) {
    let updatedDataset = []

    for (let index = 0; index < dataset.length; index++) {
      updatedDataset.push({
        downloads:
          index === 0
            ? 0
            : Math.max(
                0,
                dataset[index].downloads - dataset[index - 1].downloads
              ),
        created_at: dataset[index].created_at,
      })
    }

    console.log(updatedDataset)

    this.setState({
      dailyDownloads: updatedDataset,
    })
  }

  render() {
    const { app, dailyDownloads, dailyViews } = this.state
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
                  <h3>Cumulative Downloads</h3>
                  <LineChart
                    width={300}
                    height={300}
                    data={(app && app.records) || []}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                  >
                    <XAxis
                      dataKey="created_at"
                      tickFormatter={item => moment(item).format('MMM Do YY')}
                    />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />

                    <Line
                      type="monotone"
                      dataKey="downloads"
                      stroke="#82ca9d"
                    />
                  </LineChart>
                </div>
                <div className="col-sm" align="center">
                  <h3>Daily Downloads</h3>
                  <LineChart
                    width={300}
                    height={300}
                    data={dailyDownloads || []}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                  >
                    <XAxis
                      dataKey="created_at"
                      tickFormatter={item => moment(item).format('MMM Do YY')}
                    />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />

                    <Line
                      type="monotone"
                      dataKey="downloads"
                      stroke="#82ca9d"
                    />
                  </LineChart>
                </div>
              </div>
              <div class="row">
                <div className="col-sm" align="center">
                  <h3>Cumulative Views</h3>
                  <LineChart
                    width={300}
                    height={300}
                    data={(app && app.records) || []}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                  >
                    <XAxis
                      dataKey="created_at"
                      tickFormatter={item => moment(item).format('MMM Do YY')}
                    />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />

                    <Line type="monotone" dataKey="views" stroke="#82ca9d" />
                  </LineChart>
                </div>
                <div className="col-sm" align="center">
                  <h3>Daily Downloads</h3>
                  <LineChart
                    width={300}
                    height={300}
                    data={dailyViews || []}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                  >
                    <XAxis
                      dataKey="created_at"
                      tickFormatter={item => moment(item).format('MMM Do YY')}
                    />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />

                    <Line type="monotone" dataKey="views" stroke="#82ca9d" />
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
