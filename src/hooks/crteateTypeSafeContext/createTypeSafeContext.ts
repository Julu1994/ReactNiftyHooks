import {
  createContext,
  useContext,
  ProviderExoticComponent,
  ProviderProps
} from 'react'

/**
 * Creates a type-safe context and a corresponding hook to access the context,
 * ensuring the context is used within its Provider.
 * @param defaultValue The default value for the context, used if no provider is found up the tree.
 * @returns A tuple containing the custom hook to access the context and the Provider component.
 */
export function createTypeSafeContext<T>(
  defaultValue: T
): [() => T, ProviderExoticComponent<ProviderProps<T>>] {
  const context = createContext<T>(defaultValue)

  const useTypeSafeContext = (): T => {
    const contextValue = useContext(context)
    if (contextValue === undefined) {
      throw new Error(
        'useTypeSafeContext must be used within a Provider with a value or ensure a default value is provided'
      )
    }
    return contextValue
  }

  return [useTypeSafeContext, context.Provider]
}
