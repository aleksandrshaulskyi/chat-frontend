import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

import { AvatarEditForm } from '../../features/user/ui/avatar-edit-form/avatar-edit-form'
import { Pano } from '../../components/pano/pano'
import { useAppSelector } from '../../hooks'

import ApplicationStyling from '../../styling/application.module.css'
import AvatarEditStyling from './avatar-edit.module.css'
import BackwardsIcon from '../../media/left-arrow.svg'


export function AvatarEdit(): ReactElement {
    const navigate = useNavigate()
    const {userIsLoading, userData} = useAppSelector(state => state.user)
    const avatarUrl = userData?.avatar_url || ''
    const backwardsIconContainerClassName = `${AvatarEditStyling.backwardsIconContainer} ${ApplicationStyling.breathe}`
    const panoWidth = 25

    function handleClick() {
        navigate('/')
    }

    return (
        <Pano width={panoWidth} isLoading={userIsLoading}>
            <div className={backwardsIconContainerClassName} onClick={handleClick}>
                <img className={AvatarEditStyling.backwardsIcon} src={BackwardsIcon} alt='Backwards icon'></img>
            </div>
            <AvatarEditForm src={avatarUrl} />
        </Pano>
    )
}
