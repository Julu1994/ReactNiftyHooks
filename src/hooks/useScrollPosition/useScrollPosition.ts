import { useEffect, useState } from 'react'
import { type ScrollPositionState } from './type'

/**
 * useScrollPosition - Monitors and returns the window's current vertical scroll position.
 *
 * This hook sets up an event listener for the window's `scroll` event to track vertical scroll position changes.
 * It's safe for use in environments that support the `window` object, including considerations for SSR (Server-Side Rendering).
 * Upon mount, the hook immediately updates to the current scroll position and provides real-time updates as the user scrolls.
 *
 * @returns {scrollYPosition: number} - The current vertical scroll position of the window.
 *
 * Example:
 * ```
 * const { scrollYPosition } = useScrollPosition();
 * ```
 */

export const useScrollPosition = (): ScrollPositionState => {
  const [scrollYPosition, setScrollYPosition] = useState<number>(0)

  const handleScrollUpdate = (): void => {
    setScrollYPosition(window.scrollY)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScrollUpdate)

      handleScrollUpdate()
    }
    return () => window.removeEventListener('scroll', handleScrollUpdate)
  }, [])

  return { scrollYPosition }
}
