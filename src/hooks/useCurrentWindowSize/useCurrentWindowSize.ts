import { useState, useEffect } from 'react'
import { IWindowSize } from './type'

/**
 * A React hook designed for monitoring and retrieving the dimensions of the browser's window.
 * This hook facilitates responsive design by providing real-time updates on window resizing events.
 * It ensures that components can react to changes in window size, making it particularly useful
 * for adaptive and responsive layouts.
 *
 * The hook leverages a throttling mechanism to optimize performance during continuous resize events,
 * minimizing potential performance impacts on the application.
 *
 * Usage:
 * const { width, height } = useCurrentWindowSize();
 *
 * @return {IWindowSize} An object containing the current `width` and `height` of the window.
 */
export const useCurrentWindowSize = (): IWindowSize => {
  const [size, setSize] = useState<IWindowSize>({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const updateSize = () => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      updateSize()
      let resizeTimerId: number | undefined

      const handleResize = () => {
        clearTimeout(resizeTimerId)
        resizeTimerId = window.setTimeout(updateSize, 200)
      }

      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return size
}
