







import { createSlice } from '@reduxjs/toolkit'

import { createChat } from './thunks/create-chat'
import { deepEqual } from '../../../utils/deep-equal'
import { getChats } from './thunks/get-chats'
import { TChats } from './types'


const initialState: TChats = {
    isLoading: false,
    error: null,
    selectedChat: null,
    chats: [],
}

export const chatsSlice = createSlice(
    {
        name: 'chats',
        initialState,
        reducers: {
            addChat: (state, action) => {
                state.chats.push(action.payload)
            },
            changeSelectedChat: (state, action) => {
                state.selectedChat = action.payload
            }
        },
        extraReducers: (builder) => {
            builder.addCase(
                getChats.pending, (state, action) => {
                    state.isLoading = true
                }
            )
            builder.addCase(
                getChats.fulfilled, (state, action) => {
                    state.chats = action.payload
                    state.isLoading = false
                }
            )
            builder.addCase(
                createChat.pending, (state, action) => {
                    state.isLoading = true
                }
            )
            builder.addCase(
                createChat.fulfilled, (state, action) => {
                    const chatExists = state.chats.find(chat => deepEqual(chat, action.payload))

                    if (!chatExists) state.chats.push(action.payload)

                    state.isLoading = false
                }
            )
        }
    }
)

export const chatsReducer = chatsSlice.reducer
export const chatsActions = chatsSlice.actions
