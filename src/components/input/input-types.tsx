import { ChangeEvent } from 'react'


export type TInputProps = {
    id: string,
    type: string,
    labelText: string,
    value: string,
    hasError: boolean,
    errorText: string | undefined,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
}
