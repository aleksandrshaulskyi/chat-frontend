import { ReactElement } from 'react'

import { TButton } from './button-types'

import ApplicationStyling from '../../styling/application.module.css'
import ButtonStyling from './button.module.css'


export function Button(props: TButton): ReactElement {
    const { text, isActive, isLoading, onClick } = props

    const buttonClassName = isActive ? ButtonStyling.activeButton : ButtonStyling.inactiveButton
    const spanClassName = isLoading ? ApplicationStyling.spinner : ButtonStyling.inactiveSpan
    const pClassName = isLoading ? ButtonStyling.invisibleText : ButtonStyling.visibleText

    return (
        <button className={buttonClassName} onClick={onClick}><span className={spanClassName}></span><p className={pClassName}>{text}</p></button>
    )
}
