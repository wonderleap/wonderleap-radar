import React from 'react'
import { Table as TableBS } from 'react-bootstrap'
import { Link } from 'gatsby'
import format from '../../utils/numbers'
import moment from 'moment'

function Table(props) {
  const { columns, data } = props

  return (
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
                <td>{index + 1}</td>
                <td>
                  <Link to={`/app?id=${elm.id}`}>
                    <p>{elm.name}</p>
                    <small class="text-muted">
                      {'Updated ' +
                        moment(
                          elm.records[elm.records.length - 1].created_at
                        ).fromNow() || 'No records yet'}
                    </small>
                  </Link>
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
                  <small class="text-muted">
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
                  <small class="text-muted">
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
              </tr>
            )
          })}
      </tbody>
    </TableBS>
  )
}

export default Table
