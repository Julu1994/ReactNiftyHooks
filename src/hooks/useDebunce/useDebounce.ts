import { useState, useEffect } from 'react'

/**
 * useDebounce - A hook that debounces a value. Useful for delaying a function call
 * on a rapidly changing value like text input. It only updates the debounced value
 * after the specified delay time has passed without the value changing.
 *
 * @param value - The value to debounce.
 * @param delay - The delay in milliseconds to wait before updating the debounced value.
 * @returns The debounced value which updates only after the specified delay.
 *
 * Example Usage:
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 * useEffect(() => {
 *   // API call or other action using the debounced value
 *   performSearch(debouncedSearchTerm);
 * }, [debouncedSearchTerm]);
 */
const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
