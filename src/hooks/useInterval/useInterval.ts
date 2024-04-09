import { useEffect, useRef } from 'react'

/**
 * useInterval - A hook that allows you to run a function at specified intervals.
 *
 * This hook abstracts away the complexity of setting up and tearing down intervals,
 * making it easier to use intervals within your React components. It handles cleanup
 * automatically and ensures that interval callbacks are always using the latest props
 * and state without needing to reset the interval.
 *
 * @param callback - The function to be executed at each interval.
 * @param delay - The interval duration in milliseconds. If null, the interval will be paused.
 *
 * Example Usage:
 * ```tsx
 * useInterval(() => {
 *   // Your interval task here
 * }, 1000);
 * ```
 */
export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
