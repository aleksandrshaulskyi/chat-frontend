import { ReactElement } from 'react'

import { timestampToTime } from '../../../../utils/timestamp-to-time'
import { TMessageProps } from '../../model/types'

import MessageStyling from './message.module.css'


export function Message({sender_id, avatarUrl, username, sent_at, body, currentUserId}: TMessageProps): ReactElement {
    const sentAt = timestampToTime(sent_at)
    const containerClassName = sender_id === currentUserId ? MessageStyling.messageContainerRight : MessageStyling.messageContainerLeft

    return (
        <div className={containerClassName}>
            <div className={MessageStyling.messageDataContainer}>
                <div className={MessageStyling.senderProfileContainer}>
                    <div className={MessageStyling.senderAvatarContainer}>
                        <img className={MessageStyling.senderAvatar} src={avatarUrl} alt='Sender avatar'></img>
                    </div>
                    <p className={MessageStyling.senderName}>{username}</p>
                </div>
                <p>{sentAt}</p>
            </div>
            <div className={MessageStyling.messageBody}>
                {body}
            </div>
        </div>
    )
}