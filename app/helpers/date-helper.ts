import dateFormat from 'dateformat'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

export function toString(timestamp: number): string {
  const t = new Date(timestamp * 1000)
  return dateFormat(t, 'mmm d')
}

export function toTimeSince(timestamp: number) {
  const t = new Date(timestamp * 1000)
  return timeAgo.format(t, 'mini')
}

export function toPythonString(date: Date): string {
  return dateFormat(date, 'yyyy-mm-dd')
}
