







import { createAsyncThunk } from '@reduxjs/toolkit'

import { baseUrl, genericErrorData } from '../../../../config'
import { TGetMessagesPayload, TGetMessagesResponse } from '../types'
import { TGenericThunkConfiguration } from '../../../../types/generic-thunk-configuration'


export const getMessages = createAsyncThunk<TGetMessagesResponse, TGetMessagesPayload, TGenericThunkConfiguration>(
    'messenger/get-messages',

    async (payload, {rejectWithValue}) => {
        const accessToken = payload.accessToken
        const chatId = payload.chatId
        const cursor = payload.cursor

        let url

        if (cursor) {
            url = `${baseUrl}/messaging/messages/get-messages?chat_id=${chatId}&cursor=${cursor}`
        }
        else {
            url = `${baseUrl}/messaging/messages/get-messages?chat_id=${chatId}`
        }

        try {
            const response = await fetch(
                url,
                {
                    method: 'GET',
                    headers: {'Authorization': `Bearer ${accessToken}`}
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