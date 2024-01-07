import dayjs, { Dayjs } from 'dayjs'
import moment from 'moment'

export const msToTime = (ms: number) => {
  let seconds = Math.floor((ms / 1000) % 60)
  let minutes = Math.floor((ms / (1000 * 60)) % 60)
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
  const days = Math.abs(Math.floor(ms / (1000 * 3600 * 24)))

  hours = hours < 10 ? 0 + hours : hours
  minutes = minutes < 10 ? 0 + minutes : minutes
  seconds = seconds < 10 ? 0 + seconds : seconds

  return { hours, minutes, seconds, days }
}

export const dateFormatterNth = (date: string | Date) => {
  return moment(date).format('Do MMM YYYY - HH:MM a')
}

export const disablePastDates = (current: Dayjs, disableBeforeDate: Dayjs) => {
  return current && current.isBefore(disableBeforeDate.startOf('day'))
}
export const isTimeInPast = (inputTime: string): boolean => {
  const inputDateTime = new Date(inputTime)
  const currentDateTime = new Date()

  return inputDateTime < currentDateTime
}

export const formatDate = (dateToConvert: Date | string | any) => {
  const now = new Date()
  const date = new Date(dateToConvert)
  const isPast = now > date

  const diff = now.getTime() - date.getTime()
  const { seconds, minutes, hours, days } = msToTime(diff)

  if (days > 7) {
    return dateFormatterNth(dateToConvert)
  } else if (days) {
    return `${days} ${days <= 1 ? 'day' : 'd'} ${isPast ? 'ago' : ''}`
  } else if (hours) {
    return `${hours}${hours <= 1 ? 'h' : 'h'} ${isPast ? 'ago' : ''}`
  } else if (minutes) {
    return `${minutes}${minutes <= 1 ? 'minute' : 'm'} ${isPast ? 'ago' : ''}`
  } else if (seconds) {
    return `${seconds}${seconds <= 1 ? 'second' : 's'} ${isPast ? 'ago' : ''}`
  }
}
