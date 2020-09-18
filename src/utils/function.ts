/**
 * Call a function "n" times and return an array with the results.
 *
 * @param fn - The function to call "n" number of times.
 * @param times - Number of times to call the function "fn"
 * @returns T - Returns the result of calling "fn" in an array of "times" length.
 */
export async function callTimes<T> (fn: () => T | Promise<T>, times: number): Promise<T[]> {
  let data: Array<Promise<T>> = []
  for (let i = 0; i < times; i++) {
    data = [...data, Promise.resolve(fn())]
  }

  return await Promise.all(data)
}
