const moment = require('moment')

export const formatDate = dateString => {
  const date = moment(dateString)

  return date.format("LL")
}

export const getTimestamp = dateString => {
  return moment(dateString).unix()
}

export const sortByDate = (dateSortable, sort = "asc") => {
  if (dateSortable.length < 1) {
    return []
  }

  return dateSortable.sort((a, b) => {
    const aDate = moment(a.date)
    const bDate = moment(b.date)

    if (aDate.isAfter(bDate)) return sort === 'asc' ? 1 : -1

    if (aDate.isBefore(bDate)) return sort === 'asc' ? -1 : 1

    return 0
  })
}
