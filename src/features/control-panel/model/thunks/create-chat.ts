import { createAsyncThunk } from '@reduxjs/toolkit'

import { baseUrl, genericErrorData } from '../../../../config'
import { TCreateChatPayload, TChat } from '../types'
import { TGenericThunkConfiguration } from '../../../../types/generic-thunk-configuration'


export const createChat = createAsyncThunk<TChat, TCreateChatPayload, TGenericThunkConfiguration>(
    'chats/create-chat',

    async (payload, {rejectWithValue}) => {
        const url = `${baseUrl}/messaging/chats/`
        const accessToken = payload.accessToken
        const body = {user_ids: payload.user_ids}

        try {
            const response = await fetch(
                url,
                {
                    method: 'POST',
                    headers: {'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json'},
                    body: JSON.stringify(body)
                }
            )

            if (!response.ok) {
                return rejectWithValue(await response.json())
            }

            return await response.json()
        }
        catch(error) {
            return rejectWithValue(genericErrorData)
        }
    }
)
