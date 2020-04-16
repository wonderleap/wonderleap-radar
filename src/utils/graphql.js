const axios = require('axios')

const request = ({ headers, query, variables }) => {
  return axios({
    method: 'POST',
    url: 'https://annie-vr.herokuapp.com/v1/graphql',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-hasura-role': 'anonymous',
    },
    data: {
      query,
      variables,
    },
  }).then(_data => _data.data)
}

export default request
