export const format = (num, digits) => {
  var si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  var i
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol
}

export const cardinalToOrdinal = n => {
  let res = ''
  if (n === 0) return (res = String(n))

  switch (n % 10) {
    case 1:
      if (n === 11) return (res = `${n}th`)
      res = `${n}st`
      break
    case 2:
      if (n === 12) return (res = `${n}th`)
      res = `${n}nd`
      break
    case 3:
      if (n === 13) return (res = `${n}th`)
      res = `${n}rd`
      break
    default:
      res = `${n}th`
      break
  }
  return res
}
