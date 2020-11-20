
export function extensionFromUrl(s: string): string {
  const e = s.split('.')
  return e[e.length - 1]
}
