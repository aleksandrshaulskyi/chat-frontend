import { ReactElement } from 'react'

import { TChatProps } from '../../model/types'

import ChatStyling from './chat.module.css'


export function Chat({related_users, currentUserId}: TChatProps): ReactElement {
    const anotherUser = related_users.find(user => user.id !== currentUserId)

    const displayedAvatarUrl = anotherUser?.avatar_url
    const displayedUsername = anotherUser?.username

    return (
        <div className={ChatStyling.chatContainer}>
            <div className={ChatStyling.chatDisplayedImageContainer}>
                <img className={ChatStyling.chatDisplayedImage} src={displayedAvatarUrl} alt='Contact avatar'></img>
            </div>
            <p className={ChatStyling.chatDisplayedUsername}>@{displayedUsername}</p>
        </div>
    )
}
