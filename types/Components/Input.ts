export interface IInputProps {
    label?: string
    placeholder?: string
    type: "text" | "password" | "email"
    required?: boolean
    modelValue: string,
    id: string,
    name: string,
    autocomplete?: string
}