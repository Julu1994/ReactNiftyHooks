export interface UseFetchReturnType<T> {
  data: T | null
  error: Error | null
  isLoading: boolean
  isError: boolean
}

export interface CacheType {
  [url: string]: unknown
}
