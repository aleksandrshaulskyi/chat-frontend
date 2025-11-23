import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getMessages } from './thunks/get-messages'
import { TMessengerInitialState } from './types'
import { TGetMessagesResponse } from './types'


const initialState: TMessengerInitialState = {
    isConnected: false,
    isLoading: false,
    error: null,
    messages: [],
    cursor: null,
    previousMessagesExist: false,
}


export const messengerSlice = createSlice(
    {
        name: 'messenger',
        initialState,
        reducers: {
            connect: (_state, _action: PayloadAction<{url: string}>) => {},
            onOpen: state => {
                state.isConnected = true
            },
            onError: (state, action: PayloadAction<any>) => {
                state.isConnected = false
                state.error = action.payload
            },
            send: (state, action: PayloadAction<any>) => {
                state.messages.push(action.payload)
            },
            onMessage: (state, action: PayloadAction<any>) => {
                const messageIndex = state.messages.findIndex(
                    message => message.client_message_id === action.payload.client_message_id
                )

                if (messageIndex !== -1) {
                    state.messages[messageIndex] = action.payload
                } else {
                    state.messages.push(action.payload)
                }
            },
            onClose: state => {
                state.isConnected = false
                state.error = null
                state.messages = []
            },
            disconnect: (_state) => {}
        },
        extraReducers: (builder) => {
            builder.addCase(
                getMessages.pending, (state, action) => {
                    state.isLoading = true
                }
            )
            builder.addCase(
                getMessages.fulfilled, (state, action: PayloadAction<TGetMessagesResponse>) => {
                    state.messages = [
                        ...state.messages,
                        ...action.payload.messages.filter(
                            message => !state.messages.some(existingMessage => existingMessage.client_message_id === message.client_message_id)
                        )
                    ]
                    state.cursor = action.payload.cursor
                    state.previousMessagesExist = action.payload.previous_messages_exist
                    state.isLoading = false
                }
            )
        }
    }
)

export const messengerReducer = messengerSlice.reducer
export const messengerActions = messengerSlice.actions
