







import { ReactElement } from 'react'

import { Pano } from '../../components/pano/pano'
import { SignUpForm } from '../../features/user/ui/sign-up/sign-up-form'

import SignUpStyling from './sign-up.module.css'


export function SignUp(): ReactElement {
    const panoWidth = 23
    return (
        <Pano width={panoWidth} isLoading={false}>
            <div className={SignUpStyling.container}>
                <p className={SignUpStyling.heading}>Sign Up</p>
                <SignUpForm />
            </div>          
        </Pano>
    )
}