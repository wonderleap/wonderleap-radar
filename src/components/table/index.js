import React from 'react'
import {
  Table as TableBS,
  Row,
  Col,
  Container,
  Nav,
  Image,
} from 'react-bootstrap'
import { Link } from 'gatsby'
import format from '../../utils/numbers'
import moment from 'moment'

function Table(props) {
  const { columns, data, title, startingIndex } = props

  console.log(data)
  return (
    <Container fluid>
      <TableBS striped bordered>
        <thead>
          <tr>
            {columns.map(col => (
              <th>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((elm, index) => {
              if (elm.records.length === 0) {
                console.log(elm.sq_id, 'has no records')
                return
              }

              return (
                <tr key={elm.sq_id}>
                  <td className=" text-center" style={{ width: 10 }}>
                    <small style={{ fontSize: 15, fontWeight: 700 }}>
                      {startingIndex + index + 1}
                    </small>
                    {/*<small class="text-muted" style={{ fontSize: 10 }}>
                      {'Record updated ' +
                        moment(
                          elm.records[elm.records.length - 1].created_at
                        ).fromNow() || 'No records yet'}
                        </small>*/}
                  </td>
                  <td>
                    <Link to={`/app?id=${elm.id}`}>
                      <p style={{ fontWeight: 700 }}>{elm.name}</p>
                    </Link>

                    {/* <Image rounded src={elm.image_url} /> */}
                  </td>
                  <td>
                    {format(
                      (elm.records[elm.records.length - 1] &&
                        elm.records[elm.records.length - 1].downloads) ||
                        (elm.records[elm.records.length - 2] &&
                          elm.records[elm.records.length - 2].downloads) ||
                        0,
                      2
                    )}{' '}
                    <small className="text-muted">
                      {' '}
                      +
                      {elm.records.length > 0
                        ? !elm.records[elm.records.length - 2]
                          ? elm.records[elm.records.length - 1].downloads
                          : elm.records[elm.records.length - 1].downloads -
                            elm.records[elm.records.length - 2].downloads
                        : 0}{' '}
                      today
                    </small>
                  </td>
                  <td>
                    {format(
                      (elm.records[elm.records.length - 2] &&
                        elm.records[elm.records.length - 2].views) ||
                        (elm.records[elm.records.length - 1] &&
                          elm.records[elm.records.length - 1].views) ||
                        0,
                      2
                    )}{' '}
                    <small className="text-muted">
                      {' '}
                      +
                      {elm.records.length > 0
                        ? !elm.records[elm.records.length - 2]
                          ? elm.records[elm.records.length - 1].views
                          : elm.records[elm.records.length - 1].views -
                            elm.records[elm.records.length - 2].views
                        : 0}{' '}
                      today
                    </small>
                  </td>
                  <td className=" text-center" style={{ width: 10 }}>
                    {elm.is_webxr ? 'No' : 'Yes'}
                  </td>
                </tr>
              )
            })}
        </tbody>
      </TableBS>
    </Container>
  )
}

export default Table
