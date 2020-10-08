function toCamel(s: string): string {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '')
  })
}

function toSnake(key) {
  const result = key.replace(/([A-Z])/g, " $1")
  return result.split(' ').join('_').toLowerCase()
}

/**
 * Serialize data to a serializable object
 *
 * @param {T} data
 * @return {T}
 */
export function serialize<T>(data: T): T {
  if (typeof data === 'object' && data !== null) {
    /**
     * If data is an array
     */
    if (data instanceof Array) {
      return (data as any as Array<any>).map((dataContent) => serialize(dataContent)) as any as T
    }
    /**
     * If data is just an object
     */
    return Object.fromEntries(
      Object
        .entries(data)
        .map(([key, value]) => [toSnake(key), serialize(value)]),
    ) as any as T
  }
  return data as any as T
}

/**
 * Deserialize data to a full-featured Javascript object
 *
 * @param {T} data
 * @return {T}
 */
export function deserialize<T>(data: T): T {
  if (typeof data === 'object' && data !== null) {
    /**
     * If data is an array
     */
    if (data instanceof Array) {
      return data.map((dataContent) => deserialize(dataContent)) as any as T
    }
    /**
     * If data is just an object
     */
    // @ts-ignore
    return Object.fromEntries(
      Object
        .entries(data)
        .map(([key, value]) => [toCamel(key), deserialize(value)]),
    )
  }
  return data as any as T
}

export default {
  serialize,
  deserialize,
}
