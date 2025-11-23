import { createListenerMiddleware } from '@reduxjs/toolkit'

import { deleteCookie } from '../utils/delete-cookie'
import { loginThunk } from '../features/session/model/thunks/login'
import { logoutThunk } from '../features/session/model/thunks/logout'
import { refreshSessionThunk } from '../features/session/model/thunks/refresh-session'
import { setRefreshToken } from '../utils/set-refresh-token'


export const sessionListener = createListenerMiddleware()

sessionListener.startListening(
    {
        actionCreator: loginThunk.fulfilled,
        effect: async (action) => {
            const {refresh_token} = action.payload

            setRefreshToken(refresh_token)
        }
    }
)

sessionListener.startListening(
    {
        actionCreator: refreshSessionThunk.fulfilled,
        effect: async (action) => {
            const {refresh_token} = action.payload

            setRefreshToken(refresh_token)
        }
    }
)

sessionListener.startListening(
    {
        actionCreator: logoutThunk.fulfilled,
        effect: async () => {
            deleteCookie('refreshToken')
        }
    }
)
