import { createAsyncThunk } from '@reduxjs/toolkit'

import { baseUrl, genericErrorData } from '../../../../config'
import { TGenericThunkConfiguration } from '../../../../types/generic-thunk-configuration'
import { TUpdateAvatarData, TUpdateAvatarResponse } from '../types'


export const updateAvatarThunk = createAsyncThunk<TUpdateAvatarResponse, TUpdateAvatarData, TGenericThunkConfiguration>(
    'user/updateAvatar',

    async (data, {rejectWithValue}) => {
        const url = `${baseUrl}/users/avatar`
        const body = new FormData()

        body.append('avatar', data.avatar)

        try {
            const response = await fetch(
                url,
                {
                    method: 'PATCH',
                    headers: {'Authorization': `Bearer ${data.accessToken}`},
                    body: body,
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