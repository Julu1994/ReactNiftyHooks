# React Nifty Hooks

React Nifty Hooks is a lightweight, efficient npm package that provides a collection of custom React hooks for common web development tasks, including form management, outside click detection, local storage state management, window size monitoring, and data fetching with caching capabilities.

## Installation

Install React Useful Hooks with npm:

```bash
npm install react-nifty-hooks
```

Or with yarn:

```bash
yarn add react-nifty-hooks
```

## Usage

Below are examples on how to use each hook provided by this package.

### useForm

Manage form states, handle changes, and validate form inputs with ease.

```tsx
import { useForm } from 'react-nifty-hooks'

// Component example
const MyForm = () => {
  const { formInputs, onChangeHandler, onSubmitHandler, errors } = useForm(
    initialFormValues,
    handleSubmit,
    validateInputs
  )
  // Component logic...
}
```

### useOutsideClick

Detect clicks outside of a specified element, useful for modals and dropdowns.

```tsx
import { useOutsideClick } from 'react-nifty-hooks'

// Component example
const MyComponent = () => {
  const ref = useRef()
  const { activate, deactivate } = useOutsideClick(ref, () =>
    console.log('Clicked outside')
  )
  // Component logic...
}
```

### usePersistedState

Persist state in `localStorage` for across-session state management.

```tsx
import { usePersistedState } from 'react-nifty-hooks'

// Component example
const MyComponent = () => {
  const [value, setValue] = usePersistedState('myKey', initialValue)
  // Component logic...
}
```

### useCurrentWindowSize

Monitor and respond to changes in the browser's window size.

```tsx
import { useCurrentWindowSize } from 'react-nifty-hooks'

// Component example
const MyResponsiveComponent = () => {
  const { width, height } = useCurrentWindowSize()
  // Component logic...
}
```

### useDataFetch

Fetch and cache data from an API, with built-in loading and error handling.

```tsx
import { useDataFetch } from 'react-nifty-hooks'

// Component example
const MyDataFetcher = () => {
  const { data, isLoading, error, isError } = useDataFetch(url)
  // Component logic...
}
```

### useDebounce

Delays the update of a value until after a specified duration, reducing the frequency of function calls.

**Usage:**

```tsx
import { useDebounce } from 'react-nifty-hooks'

const SearchInput = ({ value }) => {
  const debouncedValue = useDebounce(value, 500)

  // Use debouncedValue for searching or other rate-limited actions
}
```

### useIntersectionObserver

Observes an element's visibility within the viewport, perfect for lazy loading images or triggering animations on scroll.

**Usage:**

```tsx
import { useRef } from 'react'
import { useIntersectionObserver } from 'react-nifty-hooks'

const LazyImage = src => {
  const imgRef = useRef()
  const isVisible = useIntersectionObserver(imgRef, { threshold: 0.1 })

  return <img ref={imgRef} src={isVisible ? src : 'placeholder.jpg'} alt='' />
}
```

### useInterval

Facilitates the execution of a callback function at specified intervals. Ideal for creating timers, countdowns, or polling mechanisms.

**Usage:**

```tsx
import { useInterval } from 'react-nifty-hooks'

const Timer = () => {
  useInterval(() => {
    // Callback code here
  }, 1000)
}
```

### useMediaQuery

Enables components to adapt based on CSS media query matches, allowing for responsive design directly within your React components.

**Usage:**

```tsx
import { useMediaQuery } from 'react-nifty-hooks'

const ResponsiveComponent = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return <div>{isMobile ? 'Mobile Content' : 'Desktop Content'}</div>
}
```

### usePrevious

Stores and returns the previous value of a given variable or state, useful for comparisons or detecting changes.

**Usage:**

```tsx
import { usePrevious } from 'react-nifty-hooks'

const CounterDisplay = ({ count }) => {
  const previousCount = usePrevious(count)

  return <div>Last count was {previousCount}</div>
}
```

### createTypeSafeContext

Creates a type-safe context and a corresponding hook to access the context, ensuring the context is used within its Provider.

**Usage:**

```tsx
// Defining the context
// UserProfileContext.ts
import { createTypeSafeContext } from 'react-nifty-hooks'

interface UserProfile {
  id: string
  name: string
  email: string
}

const defaultProfile: UserProfile = {
  id: '0',
  name: 'Guest',
  email: 'guest@example.com'
}

export const [useUserProfile, UserProfileProvider] =
  createTypeSafeContext<UserProfile>(defaultProfile)
```

```tsx
// Providing the context
// App.tsx
import React from 'react'
import { UserProfileProvider } from './UserProfileContext'
import UserProfileComponent from './UserProfileComponent'

function App() {
  const user = {
    id: '123',
    name: 'John Doe',
    email: 'john.doe@example.com'
  }

  return (
    <UserProfileProvider value={user}>
      <div>
        <h1>Welcome to My App</h1>
        <UserProfileComponent />
      </div>
    </UserProfileProvider>
  )
}

export default App
```

```tsx
// Consuming the context
// UserProfileComponent.tsx
import React from 'react'
import { useUserProfile } from './UserProfileContext'

function UserProfileComponent() {
  const userProfile = useUserProfile()

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {userProfile.name}</p>
      <p>Email: {userProfile.email}</p>
    </div>
  )
}

export default UserProfileComponent
```

### useDragAndDrop

The `useDragAndDrop` hook simplifies implementing drag-and-drop functionality. It manages the dragging state and the data being dragged, providing easy-to-use functions to handle drag start and end events.

```tsx
import React from 'react'
import { useDragAndDrop } from 'react-nifty-hooks'

interface Item {
  id: number
  text: string
}

function DraggableItemComponent() {
  const { isDragging, draggedData, handleDragStart, handleDragEnd } =
    useDragAndDrop<Item>()

  return (
    <div>
      <div
        draggable
        onDragStart={() => handleDragStart({ id: 1, text: 'Drag me' })}
        onDragEnd={handleDragEnd}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        {isDragging ? 'Dragging...' : 'Drag me'}
      </div>
      {draggedData && <div>Dragging: {draggedData.text}</div>}
    </div>
  )
}
```

## Contributing

Contributions are always welcome! Please read the contribution guidelines first.

## License

[MIT](LICENSE) © [Mahamudur Rahman Jewel]

```

```
