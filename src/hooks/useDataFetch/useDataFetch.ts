import { useCallback, useEffect, useState } from 'react'
import { CacheType, UseFetchReturnType } from './type'

const cache: CacheType = {}

/**
 * Fetches data from a URL and caches it to minimize network requests. Provides state management for loading, errors, and the fetched data.
 * @param url The URL to fetch data from.
 * @returns An object containing `data`, `isLoading`, `error`, and `isError`.
 */
export function useDataFetch<T>(url: string): UseFetchReturnType<T> {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [isError, setIsError] = useState<boolean>(false)

  const fetchData = useCallback(async () => {
    setIsError(false)
    setError(null)
    try {
      if (cache[url]) {
        setData(cache[url] as T)
      } else {
        setIsLoading(true)
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Network response was not ok.')
        }
        const responseData: T = await response.json()
        setData(responseData)
        cache[url] = responseData
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error)
        setIsError(true)
      }
    } finally {
      setIsLoading(false)
    }
  }, [url])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    error,
    isLoading,
    isError
  }
}
