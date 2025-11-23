import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IUserInterface, IUserStateInterface, TUpdateAvatarResponse } from './types'
import { createUserThunk } from './thunks/create-user'
import { retrieveUserThunk } from './thunks/retrieve-user'
import { TGenericError } from '../../../types/generic-error'
import { updateAvatarThunk } from './thunks/update-avatar'
import { updateUserThunk } from './thunks/update-user'


const initialState: IUserStateInterface = {
    userIsLoading: false,
    userData: null,
    userErrorData: null,
}

const userSlice = createSlice(
    {
        name: 'user',
        initialState,
        reducers: {
            resetUserErrorData(state) {
                state.userErrorData = null
            },
            resetUserState: () => ({...initialState})
        },
        extraReducers: (builder) => {
            builder.addCase(
                retrieveUserThunk.pending, (state) => {
                    state.userIsLoading = true;
                    state.userErrorData = null
                }
            )
            builder.addCase(
                retrieveUserThunk.fulfilled, (state, action: PayloadAction<IUserInterface>) => {
                    state.userData = action.payload;
                    state.userIsLoading = false
                }
            )
            builder.addCase(
                retrieveUserThunk.rejected, (state, action: PayloadAction<TGenericError | undefined>) => {
                    state.userErrorData = action.payload ?? null
                    state.userIsLoading = false
                }
            )
            builder.addCase(
                updateAvatarThunk.pending, (state) => {
                    state.userIsLoading = true;
                    state.userErrorData = null
                }
            )
            builder.addCase(
                updateAvatarThunk.fulfilled, (state, action: PayloadAction<TUpdateAvatarResponse>) => {
                    if (state.userData) {
                        state.userData.avatar_url = action.payload.avatar_url
                        state.userIsLoading = false
                    }
                }
            )
            builder.addCase(
                updateAvatarThunk.rejected, (state, action: PayloadAction<TGenericError | undefined>) => {
                    state.userErrorData = action.payload ?? null
                    state.userIsLoading = false
                }
            )
            builder.addCase(
                updateUserThunk.pending, (state) => {
                    state.userIsLoading = true;
                    state.userErrorData = null
                }
            )
            builder.addCase(
                updateUserThunk.fulfilled, (state, action: PayloadAction<IUserInterface>) => {
                    state.userData = action.payload;
                    state.userIsLoading = false
                }
            )
            builder.addCase(
                updateUserThunk.rejected, (state, action: PayloadAction<TGenericError | undefined>) => {
                    state.userErrorData = action.payload ?? null
                    state.userIsLoading = false
                }
            )
            builder.addCase(
                createUserThunk.pending, (state) => {
                    state.userIsLoading = true;
                    state.userErrorData = null
                }
            )
            builder.addCase(
                createUserThunk.fulfilled, (state, action: PayloadAction<IUserInterface>) => {
                    state.userData = action.payload;
                    state.userIsLoading = false
                }
            )
            builder.addCase(
                createUserThunk.rejected, (state, action: PayloadAction<TGenericError | undefined>) => {
                    state.userErrorData = action.payload ?? null;
                    state.userIsLoading = false
                }
            )
        }
    }
)

export const {resetUserErrorData, resetUserState} = userSlice.actions
export const userReducer = userSlice.reducer
