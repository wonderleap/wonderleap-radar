export default {
  getData: `query getData ($date1: timestamptz, $date2: timestamptz) {
        vradar {
            sidequest_apps(where: {_and: [{name: {_is_null: false}}, {name: {_nlike: "%Unlisted%"}}, {name: {_nlike: "%test%"}}, {name: {_nlike: "%Test%"}}, {name: {_nlike: "%Sign%"}}, {name: {_nlike: "%V1%"}}, {name: {_nlike: "%1.8.0%"}}, {name: {_nlike: "%1.9.0%"}}]}) {
              name
              sq_id
              records (where: {created_at: {_gte: $date1, _lt: $date2}}){
                downloads
                views
              }
            }
        }
      }
      `,
}
