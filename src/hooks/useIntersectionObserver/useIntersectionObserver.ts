import { MutableRefObject, useEffect, useState } from 'react'
import {
  type UseIntersectionObserverEntry,
  type UseIntersectionObserverOptions
} from './type'

/**
 * Monitors an element's visibility within the viewport via Intersection Observer API, providing real-time updates on its intersection status. Suitable for implementing lazy loading, scroll animations, or visibility tracking.
 *
 * By configuring the `stopOnceVisible` option, the hook can cease observation once the target element becomes fully visible, optimizing performance.
 *
 * **Example Usage:**
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const intersectionEntry = useIntersectionObserver(ref, { threshold: 0.1, stopOnceVisible: true });
 * if (intersectionEntry?.isIntersecting) {
 *   console.log('Element is visible.');
 * }
 * ```
 *
 * @param ref A React ref to the target element to observe.
 * @param options Observer options including thresholds, root, rootMargin, and a flag to stop observing once visible.
 * @returns The latest IntersectionObserverEntry, or `null` if observation hasn't begun or the API isn't supported.
 */

export const useIntersectionObserver = (
  ref: MutableRefObject<HTMLElement | null>,
  {
    threshold = 0.3,
    root = null,
    rootMargin = '0%',
    stopOnceVisible = false
  }: UseIntersectionObserverOptions
): UseIntersectionObserverEntry => {
  const [intersectionEntry, setIntersectionEntry] =
    useState<UseIntersectionObserverEntry>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || !window.IntersectionObserver) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersectionEntry(entry)
        if (entry.isIntersecting && stopOnceVisible) {
          observer.disconnect()
        }
      },
      { threshold, root, rootMargin }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [ref, threshold, root, rootMargin, stopOnceVisible])

  return intersectionEntry
}
