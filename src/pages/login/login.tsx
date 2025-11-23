import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { LoginForm } from '../../features/session/ui/login-form/login-form'
import { Pano } from '../../components/pano/pano'

import ApplicationStyling from '../../styling/application.module.css'
import LoginStyling from './login.module.css'


export function Login(): ReactElement {
    const panoWidth = 23
    const linkClassName = `${LoginStyling.link} ${ApplicationStyling.breathe}`

    return (
        <Pano width={panoWidth} isLoading={false}>
            <div className={LoginStyling.container}>
                <p className={LoginStyling.heading}>Log In</p>
                <LoginForm />
                <div className={LoginStyling.linkContainer}>
                    <p className={LoginStyling.linkText}>Newcomer?</p>
                    <Link className={linkClassName} to='/sign-up'>Sign Up</Link>
                </div>
            </div>
        </Pano>
    )
}
