import { createAsyncThunk } from '@reduxjs/toolkit'

import { baseUrl, genericErrorData } from '../../../../config'
import { IUserInterface } from '../types'
import { TGenericThunkConfiguration } from '../../../../types/generic-thunk-configuration'


export const retrieveUserThunk = createAsyncThunk<IUserInterface, string, TGenericThunkConfiguration>(
    'user/retrieve',

    async (accessToken, {rejectWithValue}) => {
        const url = `${baseUrl}/users/me`

        try {
            const response = await fetch(
                url,
                {
                    method: 'GET',
                    headers: {'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json'},
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
