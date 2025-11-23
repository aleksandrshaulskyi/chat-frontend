import { createAsyncThunk } from '@reduxjs/toolkit'

import { baseUrl, genericErrorData } from '../../../../config'
import { TGenericThunkConfiguration } from '../../../../types/generic-thunk-configuration'
import { TRefreshSessionRequest, TRefreshSessionResponse } from '../types'


export const refreshSessionThunk = createAsyncThunk<TRefreshSessionResponse, TRefreshSessionRequest, TGenericThunkConfiguration>(
    'session/refresh',

    async (body, {rejectWithValue}) => {
        const url = `${baseUrl}/sessions/refresh`

        try {
            const response = await fetch(
                url,
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(body),
                }
            )

            if (!response.ok) {
                return rejectWithValue(await response.json())
            }

            return await response.json()
        }
        catch(error) {
            return rejectWithValue(
                genericErrorData
            )
        }   
    }
)
