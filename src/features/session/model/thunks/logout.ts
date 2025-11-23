import { createAsyncThunk } from '@reduxjs/toolkit'

import { baseUrl, genericErrorData } from '../../../../config'
import { TGenericThunkConfiguration } from '../../../../types/generic-thunk-configuration'
import { TLogoutData } from '../types'


export const logoutThunk = createAsyncThunk<void, TLogoutData, TGenericThunkConfiguration>(
    'session/logout',

    async (data, {rejectWithValue}) => {
        const url = data.all ? `${baseUrl}/sessions/terminate-all` : `${baseUrl}/sessions/terminate`

        try {
            const response = await fetch(
                url,
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${data.accessToken}`}
                }
            )

            if (!response.ok) {
                return rejectWithValue(await response.json())
            }

            if (response.status === 204) {
                return
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