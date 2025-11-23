import { createAsyncThunk } from '@reduxjs/toolkit'

import { baseUrl, genericErrorData } from '../../../../config'
import { IUserInterface, TUpdateUserData } from '../types'
import { TGenericThunkConfiguration } from '../../../../types/generic-thunk-configuration'


export const updateUserThunk = createAsyncThunk<IUserInterface, TUpdateUserData, TGenericThunkConfiguration>(
    'user/update',

    async (data, {rejectWithValue}) => {
        const url = `${baseUrl}/users/update`
        const accessToken = data.accessToken
        const body = data.updateUserForm

        try {
            const response = await fetch(
                url,
                {
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}`},
                    body: JSON.stringify(body)
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
