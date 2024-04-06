import { MutableRefObject, useCallback, useEffect } from 'react'
import { ClickAwayEventType } from './type'

/**
 * Provides a hook that triggers a callback when a click occurs outside of the specified element.
 * This is useful for closing modal, dropdown menus, or context menus when the user interacts outside of these components.
 *
 * The hook returns two functions, `activate` and `deactivate`, to manually control the activation state
 * of the click-away listener, allowing for flexible use cases such as disabling the listener
 * during certain UI states.
 *
 * Example usage:
 * const ref = useRef<HTMLDivElement>(null);
 * const { activate, deactivate } = useOutsideClick(ref, () => console.log("Clicked outside!"));
 *
 * @param ref A ref object pointing to the target element to monitor for outside clicks.
 * @param onOutsideClick The callback function to execute when an outside click is detected.
 * @returns An object containing `activate` and `deactivate` methods to control the listener.
 */
export const useOutsideClick = (
  ref: MutableRefObject<HTMLElement | null>,
  onOutsideClick: () => void
): { activate: () => void; deactivate: () => void } => {
  const eventListenerCallback = useCallback(
    (event: ClickAwayEventType) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick()
      }
    },
    [onOutsideClick, ref]
  )

  const addEventListeners = useCallback(() => {
    document.addEventListener('mousedown', eventListenerCallback)
    document.addEventListener('touchstart', eventListenerCallback)
  }, [eventListenerCallback])

  const removeEventListeners = useCallback(() => {
    document.removeEventListener('mousedown', eventListenerCallback)
    document.removeEventListener('touchstart', eventListenerCallback)
  }, [eventListenerCallback])

  useEffect(() => {
    addEventListeners()

    return () => removeEventListeners()
  }, [addEventListeners, removeEventListeners])

  const activate = useCallback(() => {
    addEventListeners()
  }, [addEventListeners])

  const deactivate = useCallback(() => {
    removeEventListeners()
  }, [removeEventListeners])

  return { activate, deactivate }
}
