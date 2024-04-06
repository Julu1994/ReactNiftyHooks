import { useState } from 'react'
import {
  ChangeEventType,
  FormErrors,
  FormValues,
  SubmitEventType,
  UseFormReturnTypes
} from './type'

/**
 * Custom hook for form state management, including input values, handling changes,
 * and form submission. This hook also supports input validation.
 *
 * @param initialInputValues Object representing initial values for the form fields.
 * @param submitCallback Function to call upon form submission if inputs pass validation.
 * @param inputValidator Function to validate form inputs and return any errors.
 * @returns An object containing handlers for input changes and form submission,
 * the current form inputs, and any validation errors.
 */
export const useForm = (
  initialInputValues: FormValues,
  submitCallback: (values: FormValues) => void,
  inputValidator: (values: FormValues) => FormErrors
): UseFormReturnTypes => {
  const [formInputs, setFormInputs] = useState<FormValues>(initialInputValues)
  const [errors, setErrors] = useState<FormErrors>({})

  const onChangeHandler = (e: ChangeEventType): void => {
    const { value, name, type, checked } = e.target
    setFormInputs(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const onSubmitHandler = (e: SubmitEventType): void => {
    e.preventDefault()
    const validationErrors = inputValidator(formInputs)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    submitCallback(formInputs)
    setFormInputs(initialInputValues)
    setErrors({})
  }

  return {
    onChangeHandler,
    onSubmitHandler,
    formInputs,
    errors
  }
}
