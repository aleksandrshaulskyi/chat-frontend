import { createAsyncThunk } from '@reduxjs/toolkit'

import { baseUrl, genericErrorData } from '../../../../config'
import { TGenericThunkConfiguration } from '../../../../types/generic-thunk-configuration'
import { TLoginRequest, TLoginResponse } from '../types'


export const loginThunk = createAsyncThunk<TLoginResponse, TLoginRequest, TGenericThunkConfiguration>(
    'session/login',

    async (body, {rejectWithValue}) => {
        const url = `${baseUrl}/sessions/`

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
        catch (error) {
            return rejectWithValue(
                genericErrorData
            )
        }
    }
)
