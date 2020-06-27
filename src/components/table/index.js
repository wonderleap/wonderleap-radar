import React from 'react'
import {
  Table as TableBS,
  Row,
  Col,
  Container,
  Nav,
  Image,
  Badge,
} from 'react-bootstrap'
import { Link } from 'gatsby'
import format from '../../utils/numbers'
import moment from 'moment'

function Table(props) {
  const { columns, data, title, startingIndex } = props

  return (
    <TableBS responsive size="sm" hover>
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

            const isNew =
              moment().format('YYYY-MM-DD') ===
              moment(elm.created_at).format('YYYY-MM-DD')

            return (
              <tr key={elm.sq_id}>
                <td className="text-center" style={{ width: 10 }}>
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
                <td
                  className="text-center"
                  style={{ minWidth: 50, maxWidth: 55 }}
                >
                  <Image size="sm" rounded src={elm.image_url} />
                </td>
                <td>
                  <a
                    href={`https://sidequestvr.com/app/${elm.sq_id}`} /*to={`/app?id=${elm.id}`}*/
                  >
                    <p style={{ fontWeight: 700 }}>
                      {isNew && (
                        <Badge pill variant="dark">
                          New
                        </Badge>
                      )}{' '}
                      {elm.name}
                    </p>
                  </a>
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
                {/*  
                    <td>
                      {(
                        (elm.records[elm.records.length - 1].downloads /
                          elm.records[elm.records.length - 1].views) *
                        100
                      ).toFixed(2)}
                      %
                    </td>
                    <td style={{ width: 10 }}>
                      {elm.is_webxr ? 'WebXR' : 'Native'}
                    </td>
                  */}
              </tr>
            )
          })}
      </tbody>
    </TableBS>
  )
}

export default Table
