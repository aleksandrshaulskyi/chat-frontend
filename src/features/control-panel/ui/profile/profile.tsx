







import { ReactElement } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../../hooks'

import ApplicationStyling from '../../../../styling/application.module.css'
import ProfileStyling from './profile.module.css'


export function ProfileComponent(): ReactElement {
    const navigate = useNavigate()
    const {userIsLoading, userData} = useAppSelector(state => state.user)

    const avatarUrl = userData?.avatar_url || ''
    const username = `@${userData?.username}` || ''

    const containerClassName = userIsLoading ? `${ProfileStyling.container} ${ApplicationStyling.loading}` : `${ProfileStyling.container}`
    const avatarContainerClassName = `${ProfileStyling.avatarContainer} ${ApplicationStyling.breathe}`
    const linkClassName = `${ProfileStyling.link} ${ApplicationStyling.breathe}`

    function handleClick() {
        navigate('/edit-avatar')
    }

    return (
        <div className={containerClassName}>
            {
                userData && (
                    <>
                        <div className={avatarContainerClassName}>
                            <img className={ProfileStyling.avatar} src={avatarUrl} alt='User avatar' onClick={handleClick}></img>
                        </div>
                        <div className={ProfileStyling.dataContainer}>
                            <Link className={linkClassName} to='/profile'><p>{username}</p></Link>
                        </div>
                    </>
                )
            }
        </div>
    )
}
