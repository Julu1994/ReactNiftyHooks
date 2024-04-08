import { useEffect, useState } from 'react'
import { UseScrollOutput } from './type'

/**
 * Provides the current vertical scroll position of the window. This is useful for triggering
 * actions or animations based on the user's scroll behavior. The hook automatically attaches
 * and cleans up the scroll event listener.
 *
 * Example:
 * ```tsx
 * const MyComponent = () => {
 *   const { scrollY } = useScroll();
 *   return <div>Scroll Position: {scrollY}</div>;
 * };
 * ```
 *
 * @returns An object containing `scrollY`, the current vertical scroll position of the window.
 */

export const useScroll = (): UseScrollOutput => {
  const [scrollY, setScrollY] = useState<number>(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)

    window.addEventListener('scroll', handleScroll)

    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { scrollY }
}
