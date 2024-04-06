export type FormValues = Record<string, string | boolean>
export type FormErrors = Record<string, string>
export type ChangeEventType = React.ChangeEvent<HTMLInputElement>
export type SubmitEventType = React.FormEvent<HTMLFormElement>

export interface UseFormReturnTypes {
  onChangeHandler(e: ChangeEventType): void
  onSubmitHandler(e: SubmitEventType): void
  formInputs: FormValues
  errors: FormErrors
}
