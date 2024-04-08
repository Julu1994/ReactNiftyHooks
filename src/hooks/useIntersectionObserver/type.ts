export interface UseIntersectionObserverOptions
  extends IntersectionObserverInit {
  stopOnceVisible: boolean
}

export type UseIntersectionObserverEntry = IntersectionObserverEntry | null
