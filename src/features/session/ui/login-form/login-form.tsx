import { ChangeEvent, MouseEvent, ReactElement, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../../../components/button/button'
import { Input } from '../../../../components/input/input'
import { loginThunk } from '../../model/thunks/login'
import { sessionRefresh } from '../../../../utils/session-refresh'
import { TLoginForm } from './login-form-types'
import { useAppDispatch, useAppSelector } from '../../../../hooks'

import LoginFormStyling from './login-form.module.css'


export function LoginForm(): ReactElement {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {sessionIsLoading, accessToken, sessionErrorData} = useAppSelector(state => state.session)

    const [usernameHasError, setUsernameHasError] = useState<boolean>(false)
    const [passwordHasError, setPasswordHasError] = useState<boolean>(false)
    const [usernameErrorText, setUsernameErrorText] = useState<string | undefined>()
    const [passwordErrorText, setPasswordErrorText] = useState<string | undefined>()

    const [loginForm, setLoginForm] = useState<TLoginForm>(
        {
            username: '',
            password: '',
        }
    )

    useEffect(
        () => {
            if (sessionErrorData && sessionErrorData.details) {
                if ('username' in sessionErrorData.details) setUsernameHasError(true)
                if ('password' in sessionErrorData.details) setPasswordHasError(true)
                if (sessionErrorData.details.username) setUsernameErrorText(String(sessionErrorData.details.username))
                if (sessionErrorData.details.password) setPasswordErrorText(String(sessionErrorData.details.password))
            }
        }, [sessionErrorData]
    )

    useEffect(
        () => {
            if (!sessionIsLoading && !sessionErrorData && accessToken) {
                sessionRefresh()
                navigate('/')
            }
        }, [sessionIsLoading, sessionErrorData, accessToken, navigate]
    )

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const {id, value} = event.target
            setLoginForm(previous => ({...previous, [id]: value}))
            if (id === 'username') {
                setUsernameHasError(false)
                setUsernameErrorText('')
            }
            else if (id === 'password') {
                setPasswordHasError(false)
                setPasswordErrorText('')
            } 
        }, []
    )

    function handleClick(event: MouseEvent<HTMLButtonElement>) {

        event.preventDefault()
        if (!usernameHasError && !passwordHasError) {
            dispatch(loginThunk(loginForm))
        }
    }

    return (
        <div className={LoginFormStyling.container}>
            <form className={LoginFormStyling.form}>
                <Input 
                    id='username'
                    type='text'
                    labelText='Username'
                    value={loginForm.username}
                    hasError={usernameHasError}
                    errorText={usernameErrorText}
                    onChange={handleChange}
                />
                <Input 
                    id='password'
                    type='password'
                    labelText='Password'
                    value={loginForm.password}
                    hasError={passwordHasError}
                    errorText={passwordErrorText}
                    onChange={handleChange}
                />
                <Button text='Log In' isActive={!usernameHasError && !passwordHasError} isLoading={false} onClick={handleClick} />
            </form>
        </div>
    )
}
