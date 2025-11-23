import { ReactElement } from 'react'

import { TInputProps } from './input-types'

import InputStyling from './input.module.css'


export function Input(props: TInputProps): ReactElement {
    const { id, type, labelText, value, hasError, errorText, onChange } = props

    const inputClassName = hasError ? InputStyling.errorInput : InputStyling.baseInput
    const labelClassName = hasError ? InputStyling.errorLabel : InputStyling.baseLabel
    const spanWrapperClassName = hasError ? InputStyling.errorSpanWrapper : InputStyling.baseSpanWrapper
    const spanClassName = hasError ? InputStyling.errorSpan : InputStyling.baseSpan

    return (
        <div className={InputStyling.wrapper}>
            <div className={InputStyling.inputGroup}>
                <input
                    className={inputClassName}
                    id={id}
                    type={type}
                    placeholder=' '
                    value={value}
                    onChange={onChange}
                >
                </input>
                <label className={labelClassName} id={id} htmlFor={id}>{labelText}</label>
            </div>
            <div className={spanWrapperClassName}>
                <span className={spanClassName}>{errorText}</span>
            </div>
        </div>
    )
}
