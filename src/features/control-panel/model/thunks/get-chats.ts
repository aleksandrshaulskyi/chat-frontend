import { createAsyncThunk } from '@reduxjs/toolkit'

import { baseUrl, genericErrorData } from '../../../../config'
import { TChat } from '../types'
import { TGenericThunkConfiguration } from '../../../../types/generic-thunk-configuration'



export const getChats = createAsyncThunk<TChat[], string, TGenericThunkConfiguration>(
    'chats/get-chats',

    async (accessToken, {rejectWithValue}) => {
        const url = `${baseUrl}/messaging/chats/get-chats`

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
            return genericErrorData
        }
    }
)