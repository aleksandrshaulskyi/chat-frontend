import { createAsyncThunk } from '@reduxjs/toolkit'

import { baseUrl, genericErrorData } from '../../../../config'
import { IUserInterface, TCreateUserRequest } from '../types'
import { TGenericThunkConfiguration } from '../../../../types/generic-thunk-configuration'


export const createUserThunk = createAsyncThunk<IUserInterface, TCreateUserRequest, TGenericThunkConfiguration>(
    'user/create',

    async (body, {rejectWithValue}) => {
        const url = `${baseUrl}/users`
        
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
