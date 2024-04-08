import { useState, useEffect } from 'react'

/**
 * useMediaQuery - A hook that listens for matches to a CSS media query.
 *
 * It enables conditional rendering or execution of effects based on the result of the media query,
 * facilitating more responsive designs directly within your component logic.
 *
 * @param query - The CSS media query string to listen for.
 * @returns A boolean indicating whether the media query currently matches.
 *
 * Example:
 * const isMobile = useMediaQuery('(max-width: 600px)');
 * if (isMobile) {
 *   // Adjust layout for mobile
 * }
 */
const useMediaQuery = (query: string): boolean => {
  const getMatches = (query: string): boolean => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  }

  const [matches, setMatches] = useState<boolean>(getMatches(query))

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)

    const documentChangeHandler = () => setMatches(mediaQueryList.matches)

    mediaQueryList.addListener(documentChangeHandler)

    setMatches(mediaQueryList.matches)

    return () => {
      mediaQueryList.removeListener(documentChangeHandler)
    }
  }, [query])

  return matches
}

export default useMediaQuery
