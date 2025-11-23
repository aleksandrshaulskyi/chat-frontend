import { ChangeEvent, MouseEvent, ReactElement, useCallback, useEffect, useState } from 'react'

import { Button } from '../../../../components/button/button'
import { Input } from '../../../../components/input/input'
import { TProfileEditForm } from './profile-edit-form-types'
import { updateUserThunk } from '../../model/thunks/update-user'
import { useAppDispatch, useAppSelector } from '../../../../hooks'

import ProfileEditFormStyling from './profile-edit-form.module.css'



export function ProfileEditForm(): ReactElement {
    const dispatch = useAppDispatch()
    const accessToken = useAppSelector(state => state.session.accessToken)
    const {userIsLoading, userData, userErrorData} = useAppSelector(state => state.user)

    const [usernameHasError, setUsernameHasError] = useState<boolean>(false)
    const [emailHasError, setEmailHasError] = useState<boolean>(false)
    const [usernameErrorText, setUsernameErrorText] = useState<string | undefined>()
    const [passwordErrorText, setEmailErrorText] = useState<string | undefined>()
    const [dataFetched, setDataFetched] = useState<boolean>(false)

    const isLoading = userIsLoading && dataFetched

    const [profileEditForm, setProfileEditForm] = useState<TProfileEditForm>(
        {
            username: '',
            email: '',
        }
    )

    useEffect(
        () => {
            if (userErrorData && userErrorData.details && 'username' in userErrorData.details) setUsernameHasError(true)
            if (userErrorData && userErrorData.details && 'email' in userErrorData.details) setEmailHasError(true)
            if (userErrorData && userErrorData.details && userErrorData.details.username) setUsernameErrorText(String(userErrorData.details.username))
            if (userErrorData && userErrorData.details && userErrorData.details.email) setEmailErrorText(String(userErrorData.details.email))
        }, [userErrorData]
    )

    useEffect(
        () => {
            if (!userIsLoading && userData && !dataFetched) setProfileEditForm({username: userData?.username ?? '', email: userData?.email ?? ''})
        }, [userIsLoading, userData, dataFetched]
    )

    useEffect(
        () => {
            if (!userIsLoading && userData) setDataFetched(true)
        }, [userIsLoading, userData]
    )

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const {id, value} = event.target
            setProfileEditForm(previous => ({...previous, [id]: value}))
            if (id === 'username') {
                setUsernameHasError(false)
                setUsernameErrorText('')
            }
            else if (id === 'email') {
                setEmailHasError(false)
                setEmailErrorText('')
            }
        }, []
    )

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault()

        if (accessToken) {
            const data = {
                accessToken: accessToken,
                updateUserForm: profileEditForm,
            }

            dispatch(updateUserThunk(data))
        }
    }

    return (
        <div className={ProfileEditFormStyling.container}>
            <form className={ProfileEditFormStyling.form}>
                <Input 
                id='username'
                type='text'
                labelText='Username'
                value={profileEditForm.username}
                hasError={usernameHasError}
                errorText={usernameErrorText}
                onChange={handleChange}
                />
                <Input 
                    id='email'
                    type='text'
                    labelText='Email'
                    value={profileEditForm.email}
                    hasError={emailHasError}
                    errorText={passwordErrorText}
                    onChange={handleChange}
                />
                <Button text='Edit profile' isActive={!usernameHasError && !emailHasError && !isLoading} isLoading={isLoading} onClick={handleClick} />
            </form>
        </div>
    )
}
