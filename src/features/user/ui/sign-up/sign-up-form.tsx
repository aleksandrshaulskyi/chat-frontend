import { ChangeEvent, MouseEvent, ReactElement, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../../../components/button/button'
import { createUserThunk } from '../../model/thunks/create-user'
import { Input } from '../../../../components/input/input'
import { TSignUpForm } from './sign-up-form-types'
import { useAppDispatch, useAppSelector } from '../../../../hooks'

import SignUpFormStyling from './sign-up.module.css'


export function SignUpForm(): ReactElement {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {userIsLoading, userData, userErrorData} = useAppSelector(state => state.user)

    const [signUpForm, setSignUpForm] = useState<TSignUpForm>(
        {
            username: '',
            password: '',
            email: '',
        }
    )
    const [usernameErrorText, setUsernameErrorText] = useState<string>('')
    const [passwordErrorText, setPasswordErrorText] = useState<string>('')
    const [emailErrorText, setEmailErrorText] = useState<string>('')

    useEffect(
        () => {
            if (userErrorData && userErrorData.details && 'username' in userErrorData.details) {
                setUsernameErrorText(String(userErrorData.details.username))
            }
            if (userErrorData && userErrorData.details && 'password' in userErrorData.details) {
                setPasswordErrorText(String(userErrorData.details.password))
            }
            if (userErrorData && userErrorData.details && 'email' in userErrorData.details) {
                setEmailErrorText(String(userErrorData.details.email))
            }
        }, [userErrorData]
    )

    useEffect(
        () => {
            if (userData) navigate('/login')
        }
    )

    const usernameHasError = !!usernameErrorText
    const passwordHasError = !!passwordErrorText
    const emailHasError = !!emailErrorText
    const buttonIsLoading = userIsLoading
    const buttonIsActive = !usernameHasError && !passwordHasError && !emailHasError && !buttonIsLoading

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const {id, value} = event.target
            setSignUpForm(previous => ({...previous, [id]: value}))

            if (id === 'username') setUsernameErrorText('')
            if (id === 'password') setPasswordErrorText('')
            if (id === 'email') setEmailErrorText('')
        }, []
    )

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        dispatch(createUserThunk(signUpForm))
    }

    return (
        <div className={SignUpFormStyling.container}>
            <form className={SignUpFormStyling.form}>
                <Input 
                    id='username'
                    type='text'
                    labelText='Username'
                    value={signUpForm.username}
                    hasError={usernameHasError}
                    errorText={usernameErrorText}
                    onChange={handleChange}
                />
                <Input 
                    id='password'
                    type='password'
                    labelText='Password'
                    value={signUpForm.password}
                    hasError={passwordHasError}
                    errorText={passwordErrorText}
                    onChange={handleChange}
                />
                <Input 
                    id='email'
                    type='text'
                    labelText='Email'
                    value={signUpForm.email}
                    hasError={emailHasError}
                    errorText={emailErrorText}
                    onChange={handleChange}
                />
                <Button text='Sign Up' isActive={buttonIsActive} isLoading={buttonIsLoading} onClick={handleClick} />
            </form>
        </div>
    )
}
