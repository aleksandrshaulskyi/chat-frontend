import { ChangeEvent, MouseEvent, ReactElement, useEffect, useRef, useState } from 'react'

import { baseUrl, baseWsUrl } from '../../../../config'
import { generateMessageUid } from '../../../../utils/generate_message_uid'
import { getMessages } from '../../model/thunks/get-messages'
import { Message } from '../message/message'
import { MessageStatus } from '../../model/types'
import { messengerActions } from '../../model/messenger-slice'
import { TMessage, TMessageProcessed } from '../../model/types'
import { useAppDispatch, useAppSelector } from '../../../../hooks'

import ArrowUp from '../../../../media/arrow-up.svg'
import MessengerStyling from './messenger.module.css'


export function Messenger(): ReactElement {
    const dispatch = useAppDispatch()

    const accessToken = useAppSelector(state => state.session.accessToken)
    const currentUser = useAppSelector(state => state.user.userData)
    const selectedChat = useAppSelector(state => state.chats.selectedChat)
    const {isLoading, cursor, messages, previousMessagesExist} = useAppSelector(state => state.messenger)

    const [connectionPass, setConnectionPass] = useState<String>('')
    const [message, setMessage] = useState<string>('')
    const [initialScrollDone, setInitialScrollDone] = useState<boolean>(false)

    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const messagesContainerRef = useRef<HTMLDivElement>(null)

    useEffect(
        () => {
            const messagesContainer = messagesContainerRef.current
            if(messagesContainer && !initialScrollDone) {
                requestAnimationFrame(
                    () => {messagesContainer.scrollTop = messagesContainer.scrollHeight}
                )
            }
        }, [messages, initialScrollDone]
    )

    useEffect(
        () => {
            const url = `${baseUrl}/transportation/messages/get-connection-pass`
            const fetchConnectionPass = async () => {
                const response = await fetch(
                    url,
                    {
                        method: 'POST',
                        headers: {'Authorization': `Bearer ${accessToken}`}
                    }
                )

                const connectionPassData = await response.json()

                setConnectionPass(connectionPassData.connection_pass)
            }

            if (accessToken) fetchConnectionPass()
        }, [accessToken]
    )

    useEffect(
        () => {
            if (connectionPass) {
                dispatch(messengerActions.connect({url: `${baseWsUrl}/transportation/messages/?connection_pass=${connectionPass}`}))
            }
        }, [dispatch, connectionPass]
    )

    useEffect(
        () => {
            if (selectedChat) {
                const payload = {accessToken: String(accessToken), chatId: String(selectedChat.id), cursor: null}

                dispatch(getMessages(payload))
            }
        }, [dispatch, accessToken, selectedChat]
    )

    useEffect(
        () => {
            const messagesContainer = messagesContainerRef.current

            if (!messagesContainer) return

            const onFirstScroll = () => {
                setInitialScrollDone(true)
            }

            messagesContainer.addEventListener('scroll', onFirstScroll, {passive: true, once: true})

            const onScroll = () => {
                const distanceToTop = messagesContainer.scrollTop

                if (distanceToTop === 0 && selectedChat && cursor && previousMessagesExist) {
                    const payload = {accessToken: String(accessToken), chatId: String(selectedChat.id), cursor: cursor}

                    dispatch(getMessages(payload))

                    messagesContainer.scrollTop += 1
                }
            }

            messagesContainer.addEventListener('scroll', onScroll, {passive: true})

            return () => messagesContainer.removeEventListener('scroll', onScroll)
        }, [dispatch, accessToken, cursor, selectedChat, previousMessagesExist]
    )

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const element = event.target

        const value = element.value
        const contentHeight = element.scrollHeight
        const baseHeight = window.innerHeight * 0.07

        setMessage(value)

        if (value === '') {
            element.style.height = baseHeight + 'px'
        }
        else {
            element.style.height = Math.max(contentHeight, baseHeight) + 'px'
        }
    }

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault()

        if (message) {
            dispatch(
                messengerActions.send(
                    {
                        id: null,
                        client_message_id: generateMessageUid(),
                        chat_id: selectedChat?.id,
                        sender_id: currentUser?.id,
                        recipient_id: recipientUser?.id,
                        status: MessageStatus.sent,
                        sent_at: new Date().toISOString(),
                        delivered_at: '',
                        body: message,
                        is_edited: false,
                        is_deleted: false,
                    }
                )
            )

            setMessage('')

            if(textAreaRef && textAreaRef.current) textAreaRef.current.value = ''
        }
    }

    const recipientUser = selectedChat?.related_users.find(user => user.id !== currentUser?.id)

    const messagesClean = messages.filter(message => 
        message.chat_id === selectedChat?.id
    )

    const messagesSorted: TMessage[] = [...messagesClean].sort(
        (a, b) => new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime()
    )

    const messagesProcessed: TMessageProcessed[] = messagesSorted.map(
        messageClean => {
            if (messageClean.sender_id === currentUser?.id) {
                return {...messageClean, avatarUrl: String(currentUser.avatar_url), username: String(currentUser.username)}
            }
            else if (messageClean.sender_id === recipientUser?.id) {
                return {...messageClean, avatarUrl: String(recipientUser.avatar_url), username: String(recipientUser.username)}
            }
            else {
                return {...messageClean, avatarUrl: '', username: ''}
            }
        }
    )

    const currentUserId = currentUser && currentUser.id

    const animatedLoadingClassName = isLoading ? MessengerStyling.animatedLoadingActive : MessengerStyling.animatedLoadingInactive
    const containerClassName = isLoading ? MessengerStyling.containerActive : MessengerStyling.containerInactive

    return (
        <div className={animatedLoadingClassName}>
            <div className={containerClassName}>
                <div className={MessengerStyling.messagesContainer} ref={messagesContainerRef}>
                    {
                        messagesProcessed && (
                            messagesProcessed.map(
                                messageProcessed => (
                                    <Message key={messageProcessed.client_message_id} {...messageProcessed} currentUserId={currentUserId}/>
                                )
                            )
                        )
                    }
                </div>
                <div className={MessengerStyling.inputContainer}>
                    <textarea className={MessengerStyling.messageTextArea} onInput={handleChange} ref={textAreaRef}></textarea>
                    <button className={MessengerStyling.sendMessageButton} onClick={handleClick}>
                        <img className={MessengerStyling.arrowUp} src={ArrowUp} alt='Arrow SVG'></img>
                    </button>
                </div>
            </div>
        </div>
    )
}
