const request = ({ headers, query, variables }) => {
  return fetch('https://annie-vr.herokuapp.com/v1/graphql', {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-hasura-admin-secret': 'sidequest_snapshots',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
    .then(r => r.json())
    .then(_data => _data)
}

export default request
