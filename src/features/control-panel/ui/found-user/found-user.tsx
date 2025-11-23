import { ReactElement } from 'react'

import { TFoundUser } from '../../model/types'

import FoundUserStyling from './found-user.module.css'


export function FoundUser(foundUser: TFoundUser): ReactElement {
    return (
        <div className={FoundUserStyling.foundUserContainer}>
            <div className={FoundUserStyling.foundUserImageContainer}>
                <img className={FoundUserStyling.foundUserImage} src={foundUser.avatar_url} alt='Contact avatar'></img>
            </div>
            <p className={FoundUserStyling.foundUserUsername}>@{foundUser.username}</p>
        </div>
    )
}
