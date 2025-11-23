import { ReactElement, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../components/button/button'
import { logoutThunk } from '../../features/session/model/thunks/logout'
import { Pano } from '../../components/pano/pano'
import { ProfileEditForm } from '../../features/user/ui/profile-edit-form/profile-edit-form'
import { resetUserState } from '../../features/user/model/user-slice'
import { useAppDispatch, useAppSelector } from '../../hooks'

import BackwardsIcon from '../../media/left-arrow.svg'

import ApplicationStyling from '../../styling/application.module.css'
import ProfileStyling from './profile.module.css'


export function Profile(): ReactElement {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {userIsLoading, userData} = useAppSelector(state => state.user)
    const {sessionIsLoading, accessToken, sessionErrorData} = useAppSelector(state => state.session)
    
    const [dataFetched, setDataFetched] = useState<boolean>(false)
    const [clickedButton, setClickedButton] = useState<string>('')

    const panoWidth = 23
    const backwardsIconContainerClassName = `${ProfileStyling.backwardsIconContainer} ${ApplicationStyling.breathe}`
    const logOutButtonIsActive = !sessionIsLoading
    const terminateButtonIsActive = !sessionIsLoading
    const logOutButtonIsLoading = sessionIsLoading && dataFetched && clickedButton === 'logout'
    const terminateButtonIsLoading = sessionIsLoading && dataFetched && clickedButton === 'terminate'

    useEffect(
        () => {
            if (!userIsLoading && userData && accessToken) setDataFetched(true)
        }, [userIsLoading, userData, accessToken]
    )

    useEffect(
        () => {
            if (!sessionIsLoading && !accessToken && !sessionErrorData && dataFetched) {
                dispatch(resetUserState())
                navigate('/login')
            }
        }, [sessionIsLoading, accessToken, sessionErrorData, dataFetched, dispatch, navigate]
    )

    function handleClick() {
        navigate('/')
    }

    function handleLogOutClick() { 
        if (accessToken) {
            setClickedButton('logout')
            const data = {accessToken: accessToken, all: false}
            dispatch(logoutThunk(data))
        } 
    }

    function terminateAllSessionsClick() {
        if (accessToken) {
            setClickedButton('terminate')
            const data = {accessToken: accessToken, all: true}
            dispatch(logoutThunk(data))
        }
    }

    return (
        <Pano width={panoWidth} isLoading={userIsLoading && !dataFetched}>
            <div className={backwardsIconContainerClassName} onClick={handleClick}>
                <img className={ProfileStyling.backwardsIcon} src={BackwardsIcon} alt='Backwards icon'></img>
            </div>
            <div className={ProfileStyling.container}>
                <p className={ProfileStyling.heading}>Profile</p>
            </div>
            <ProfileEditForm />
            <div className={ProfileStyling.blockBorder}></div>
            <div className={ProfileStyling.buttonContainer}>
                <Button text='Log out' isActive={logOutButtonIsActive} isLoading={logOutButtonIsLoading} onClick={handleLogOutClick}/>
                <Button text='Terminate all sessions' isActive={terminateButtonIsActive} isLoading={terminateButtonIsLoading} onClick={terminateAllSessionsClick}/>
            </div>
        </Pano>
    )
}
