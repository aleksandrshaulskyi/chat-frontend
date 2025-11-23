import { configureStore, TypedStartListening } from '@reduxjs/toolkit'

import { messengerActions, messengerReducer } from './features/messenger/model/messenger-slice'
import { chatsReducer } from './features/control-panel/model/chatsSlice'
import { getChats } from './features/control-panel/model/thunks/get-chats'
import { messengerMiddleware } from './middleware/messenger-middleware'
import { sessionListener } from './middleware/reactive-middleware'
import { sessionReducer } from './features/session/model/session-slice'
import { userReducer } from './features/user/model/user-slice'


export const store = configureStore(
    {
        reducer: {
            session: sessionReducer,
            user: userReducer,
            chats: chatsReducer,
            messenger: messengerReducer,
        },
        middleware: (getDefault) => getDefault().prepend(sessionListener.middleware).concat(messengerMiddleware),
    }
)

export type rootState = ReturnType<typeof store.getState>
export type appDispatch = typeof store.dispatch

export type AppStartListening = TypedStartListening<rootState, appDispatch>
export const startAppListening = sessionListener.startListening as AppStartListening

startAppListening({
    actionCreator: messengerActions.onMessage,
    effect: async (action, api) => {
        const state = api.getState()
        const accessToken = state.session.accessToken
        const chats = state.chats.chats
        const chatIds = chats.map(chat => chat.id)

        if (accessToken && !chatIds.includes(action.payload.chat_id)) await api.dispatch(getChats(accessToken))
    },
})