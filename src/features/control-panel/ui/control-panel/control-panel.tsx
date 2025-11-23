import { ChangeEvent, ReactElement, useEffect, useRef, useState } from 'react'

import { Chat } from '../chat/chat'
import { chatsActions } from '../../model/chatsSlice'
import { createChat } from '../../model/thunks/create-chat'
import { FoundUser } from '../found-user/found-user'
import { getChats } from '../../model/thunks/get-chats'
import { ProfileComponent } from '../profile/profile'
import { TChat, TFoundUser } from '../../model/types'
import { useAppDispatch, useAppSelector } from '../../../../hooks'

import CloseImage from '../../../../media/close.svg'

import ControlPanelStyling from './control-panel.module.css'


export function ControlPanel(): ReactElement {
    const dispatch = useAppDispatch()

    const accessToken = useAppSelector(state => state.session.accessToken)
    const currentUser = useAppSelector(state => state.user.userData)
    const {isLoading, selectedChat, chats} = useAppSelector(state => state.chats)

    const [foundUsers, setFoundUsers] = useState<TFoundUser[]>([])
    const [searchInProgress, setSearchInProgress] = useState<boolean>(false)

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(
        () => {
            if (accessToken) {
                dispatch(getChats(accessToken))
            }   
        }, [dispatch, accessToken]
    )

    function handleFocus() {
        setSearchInProgress(true)
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const element = event.target
        const value = element.value

        if (value && value.length >= 4 && accessToken) {

            const searchUsers = async () => {
                const url = `http://localhost:80/users/search?username=${value}`
                const response = await fetch(
                    url,
                    {
                        headers: {'Authorization': `Bearer ${accessToken}`}
                    }
                )

                const responseData = await response.json()

                setFoundUsers(responseData)
            }

            searchUsers()
        }
        else if (value && value.length < 4) {
            setFoundUsers([])
        }
    }

    function handleCloseClick() {
        setFoundUsers([])
        setSearchInProgress(false)

        if (inputRef && inputRef.current) inputRef.current.value = ''
    }

    function handleUserContainerClick(userId: number) {
        const foundUser = foundUsers.find(foundUser => foundUser.id === userId)

        const payload = {accessToken: String(accessToken), user_ids: [currentUser?.id, foundUser?.id]}

        dispatch(createChat(payload))

        setFoundUsers([])
        setSearchInProgress(false)

        if (inputRef && inputRef.current) inputRef.current.value = ''
    }

    function handleChatContainerClick(chat: TChat) {
        dispatch(chatsActions.changeSelectedChat(chat))
    }

    const closeSearchButtonClassName = searchInProgress ? ControlPanelStyling.closeSearchButtonActive : ControlPanelStyling.closeSearchButtonInactive
    const currentUserId = Number(currentUser && currentUser.id)
    const selectedChatId = selectedChat?.id

    const animatedContainerClassName = isLoading ? ControlPanelStyling.animatedLoadingActive : ControlPanelStyling.animatedLoadingInactive
    const mainContainerClassName = isLoading ? ControlPanelStyling.mainContainerActive : ControlPanelStyling.mainContainerInactive

    return (
        <div className={animatedContainerClassName}>
            <div className={mainContainerClassName}>
                <ProfileComponent />
                <div className={ControlPanelStyling.contactsContainer}>
                    <div className={ControlPanelStyling.searchGroup}>
                        <input className={ControlPanelStyling.searchInput} placeholder='Search by username' onChange={handleChange} onFocus={handleFocus} ref={inputRef}></input>
                        <button className={closeSearchButtonClassName} onClick={handleCloseClick}>
                            <img className={ControlPanelStyling.closeSearchImage} src={CloseImage} alt='Search'></img>
                        </button>
                    </div>
                    {
                        searchInProgress
                            ? foundUsers.map(
                                foundUser => (
                                    <div key={foundUser.id} className={ControlPanelStyling.displayedItemContainer} onClick={() => handleUserContainerClick(foundUser.id)}>
                                        <FoundUser {...foundUser} />
                                    </div>
                                )
                            )
                            : chats.map(
                                chat => (
                                    <div
                                        key={chat.id}
                                        className={selectedChatId === chat.id ? ControlPanelStyling.displayedItemContainerActive : ControlPanelStyling.displayedItemContainer}
                                        onClick={() => handleChatContainerClick(chat)}
                                    >
                                        <Chat {...chat} currentUserId={currentUserId}/>
                                    </div>
                                )
                            )
                    }
                </div>
            </div>
        </div>
    )
}
