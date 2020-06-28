import React from 'react'
import {
  Table as TableBS,
  Row,
  Col,
  Container,
  Nav,
  Image,
  Badge,
  Button,
} from 'react-bootstrap'
import { Link } from 'gatsby'
import { format, cardinalToOrdinal } from '../../utils/numbers'
import moment from 'moment'

import twitterIcon from '../../../static/img/icons8-twitter-24.png'

function Table(props) {
  const { columns, data, title, startingIndex } = props

  return (
    <TableBS responsive size="sm" hover>
      <thead className="text-center">
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

            const totalDownloads = format(
              (elm.records[elm.records.length - 1] &&
                elm.records[elm.records.length - 1].downloads) ||
                (elm.records[elm.records.length - 2] &&
                  elm.records[elm.records.length - 2].downloads) ||
                0,
              2
            )

            const dailyDownloads =
              elm.records.length > 0
                ? !elm.records[elm.records.length - 2]
                  ? elm.records[elm.records.length - 1].downloads
                  : elm.records[elm.records.length - 1].downloads -
                    elm.records[elm.records.length - 2].downloads
                : 0

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
                <td style={{ fontWeight: 700 }} className="text-center">
                  {format(
                    (elm.records[elm.records.length - 1] &&
                      elm.records[elm.records.length - 1].downloads) ||
                      (elm.records[elm.records.length - 2] &&
                        elm.records[elm.records.length - 2].downloads) ||
                      0,
                    2
                  )}{' '}
                  <br />
                  <small
                    className="text-muted"
                    style={{ fontWeight: 700, fontSize: 10 }}
                  >
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
                <td style={{ fontWeight: 700 }} className="text-center">
                  {format(
                    (elm.records[elm.records.length - 2] &&
                      elm.records[elm.records.length - 2].views) ||
                      (elm.records[elm.records.length - 1] &&
                        elm.records[elm.records.length - 1].views) ||
                      0,
                    2
                  )}{' '}
                  <br />
                  <small
                    className="text-muted"
                    style={{ fontWeight: 700, fontSize: 10 }}
                  >
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

                <td>
                  <Button
                    size="sm"
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?text=${encodeURI(
                          `${elm.name} on ${cardinalToOrdinal(
                            index + 1
                          )} place @SideQuestVR. Reached ${totalDownloads} downloads (+${dailyDownloads} today). Check it out on:`
                        )}&url=https://radar.wonderleap.co`,
                        '_blank'
                      )
                    }
                    variant="link"
                  >
                    <img src={twitterIcon} style={{ width: 15 }} />
                  </Button>
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
