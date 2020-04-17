import React from 'react'
import { Link } from 'gatsby'

import format from '../../utils/numbers'

function Table(props) {
  const { columns, data } = props

  console.log(data)

  return (
    <table className="table table-striped table-sm">
      <thead>
        <tr>
          {columns.map(col => (
            <th>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((elm, index) => (
            <tr key={elm.sq_id}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/app?id=${elm.id}`}>
                  <p>{elm.name}</p>
                </Link>
              </td>
              <td>
                {format(
                  (elm.records[elm.records.length - 1] &&
                    elm.records[elm.records.length - 1].downloads) ||
                    (elm.records[elm.records.length - 2] &&
                      elm.records[elm.records.length - 2].downloads),
                  2
                )}{' '}
                <small class="text-muted">
                  {' '}
                  +
                  {!elm.records[elm.records.length - 2]
                    ? elm.records[elm.records.length - 1].downloads
                    : elm.records[elm.records.length - 1].downloads -
                      elm.records[elm.records.length - 2].downloads}{' '}
                  today
                </small>
              </td>
              <td>
                {format(
                  (elm.records[elm.records.length - 2] &&
                    elm.records[elm.records.length - 2].views) ||
                    (elm.records[elm.records.length - 1] &&
                      elm.records[elm.records.length - 1].views),
                  2
                )}{' '}
                <small class="text-muted">
                  {' '}
                  +
                  {!elm.records[elm.records.length - 2]
                    ? elm.records[elm.records.length - 1].views
                    : elm.records[elm.records.length - 1].views -
                      elm.records[elm.records.length - 2].views}{' '}
                  today
                </small>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default Table
