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

```javascript
import { useForm } from 'react-useful-hooks'

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

```javascript
import { useOutsideClick } from 'react-useful-hooks'

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

```javascript
import { usePersistedState } from 'react-useful-hooks'

// Component example
const MyComponent = () => {
  const [value, setValue] = usePersistedState('myKey', initialValue)
  // Component logic...
}
```

### useCurrentWindowSize

Monitor and respond to changes in the browser's window size.

```javascript
import { useCurrentWindowSize } from 'react-useful-hooks'

// Component example
const MyResponsiveComponent = () => {
  const { width, height } = useCurrentWindowSize()
  // Component logic...
}
```

### useDataFetch

Fetch and cache data from an API, with built-in loading and error handling.

```javascript
import { useDataFetch } from 'react-useful-hooks'

// Component example
const MyDataFetcher = () => {
  const { data, isLoading, error, isError } = useDataFetch(url)
  // Component logic...
}
```

## Contributing

Contributions are always welcome! Please read the contribution guidelines first.

## License

[MIT](LICENSE) © [Mahamudur Rahman Jewel]
