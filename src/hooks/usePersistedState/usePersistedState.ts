import { useState, useEffect, type Dispatch, type SetStateAction } from 'react'

/**
 * Provides a hook for storing, retrieving, and synchronizing state with the localStorage API.
 * This hook abstracts the localStorage logic, offering a straightforward way to persist state
 * across browser sessions. It automatically handles serialization and deserialization of the stored
 * data to ensure seamless type consistency.
 *
 * Example usage:
 * const [user, setUser] = usePersistedState<'User'>('user', { name: 'Jane Doe' });
 *
 * @param key The localStorage key under which the state is stored.
 * @param initialValue The initial value to use if there is no item in localStorage yet.
 * @returns A stateful value, and a function to update it.
 *          Updates to the state are automatically synchronized with localStorage.
 */
export const usePersistedState = <T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      console.error('Error reading localStorage key “' + key + '”: ', error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      const serializedState = JSON.stringify(state)
      window.localStorage.setItem(key, serializedState)
    } catch (error) {
      console.error('Error writing to localStorage key “' + key + '”: ', error)
    }
  }, [state, key])

  return [state, setState]
}
