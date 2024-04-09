import { useEffect, useRef } from 'react'

/**
 * usePrevious - A hook to store and return the previous value of a given variable or state across re-renders.
 *
 * This is useful when you need to compare the current value of a prop or state to its value in the previous
 * render cycle, for example, to detect changes or to decide whether to perform certain operations.
 *
 * @param value - The current value to track and compare in future renders.
 * @returns The previous value of the tracked variable or state.
 *
 * Example:
 * const MyComponent = ({ count }) => {
 *   const prevCount = usePrevious(count);
 *   useEffect(() => {
 *     if (prevCount !== count) {
 *       console.log(`Count changed from ${prevCount} to ${count}`);
 *     }
 *   }, [count]);
 *   return <div>Current count: {count}</div>;
 * };
 */
const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default usePrevious
