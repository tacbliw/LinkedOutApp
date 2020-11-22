import dateFormat from 'dateformat'

export function toString(timestamp: number): string {
  const t = new Date(timestamp * 1000)
  console.log(t)
  return dateFormat(t, 'mmm d')
}