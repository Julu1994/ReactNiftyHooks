import { useState, useEffect } from 'react'
import { FetchOptions } from './type'

/**
 * A React hook that fetches data from a specified URL with retry logic implemented.
 * This hook attempts to make an HTTP GET request to retrieve data and will retry if the fetch fails
 * until the maximum number of retries is reached.
 * @param url The URL from which to fetch data.
 * @param options Optional parameters to control the fetch behavior:
 *  - `retries`: The number of times to retry the fetch request after a failure. Defaults to 3.
 *  - `retryDelay`: The time in milliseconds to wait between retries. Defaults to 1000 ms.
 *
 * @returns A tuple:
 *  - `data`: The fetched data of type T or null if the fetch is unsuccessful or not yet completed.
 *  - `loading`: A boolean indicating whether the fetch request is ongoing.
 *  - `error`: An error object if an error occurred during the fetch operation; otherwise, null.
 *
 */
export function useFetchWithRetry<T>(
  url: string,
  options?: Partial<FetchOptions>
): [T | null, boolean, unknown] {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<unknown>(null)

  const { retries = 3, retryDelay = 1000 } = options || {}

  useEffect(() => {
    const fetchData = async (attempt: number = 1) => {
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error('Network response was not ok.')
        const jsonData: T = await response.json()
        setData(jsonData)
        setLoading(false)
      } catch (err) {
        if (attempt <= retries) {
          setTimeout(() => fetchData(attempt + 1), retryDelay)
        } else {
          setError(err)
          setLoading(false)
        }
      }
    }

    fetchData()
  }, [url, retries, retryDelay])

  return [data, loading, error]
}
