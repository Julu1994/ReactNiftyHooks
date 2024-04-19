import { useState, useEffect, useRef } from 'react'

/**
 * A custom hook that throttles a function. The function will only be allowed to execute
 * at most once every specified number of milliseconds.
 *
 * @param value The value to be throttled.
 * @param limit The time frame in milliseconds during which the function can only be executed once.
 * @returns The throttled value.
 */
export function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastRan = useRef(Date.now())

  useEffect(() => {
    const handler = setTimeout(
      () => {
        if (Date.now() - lastRan.current >= limit) {
          setThrottledValue(value)
          lastRan.current = Date.now()
        }
      },
      limit - (Date.now() - lastRan.current)
    )

    return () => {
      clearTimeout(handler)
    }
  }, [value, limit])

  return throttledValue
}
