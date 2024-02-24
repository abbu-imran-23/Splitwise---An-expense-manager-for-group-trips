export interface AuthInputProps {
    label: string,
    type: string,
    name: string,
    id: string,
    value: string,
    getInputValue: (value: string) => void
}