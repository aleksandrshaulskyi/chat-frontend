import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ISessionState } from './types'
import { loginThunk } from './thunks/login'
import { logoutThunk } from './thunks/logout'
import { refreshSessionThunk } from './thunks/refresh-session'
import { TGenericError } from '../../../types/generic-error'
import { TLoginResponse, TRefreshSessionResponse } from './types'


const initialState: ISessionState = {
    sessionIsLoading: false,
    accessToken: null,
    sessionErrorData: null,
}

export const sessionSlice = createSlice(
    {
        name: 'auth',
        initialState,
        reducers: {
            resetSessionErrorData(state) {
                state.sessionErrorData = null
            }
        },
        extraReducers: (builder) => {
            builder.addCase(
                loginThunk.pending, (state) => {
                    state.sessionIsLoading = true;
                    state.sessionErrorData = null
                }
            )
            builder.addCase(
                loginThunk.fulfilled, (state, action: PayloadAction<TLoginResponse>) => {
                    state.accessToken = action.payload.access_token;
                    state.sessionIsLoading = false
                }
            )
            builder.addCase(
                loginThunk.rejected, (state, action: PayloadAction<TGenericError | undefined>) => {
                    state.sessionErrorData = action.payload ?? null
                    state.sessionIsLoading = false
                }
            )
            builder.addCase(
                refreshSessionThunk.pending, (state) => {
                    state.sessionIsLoading = true;
                    state.sessionErrorData = null
                }
            )
            builder.addCase(
                refreshSessionThunk.fulfilled, (state, action: PayloadAction<TRefreshSessionResponse>) => {
                    state.accessToken = action.payload.access_token;
                    state.sessionIsLoading = false
                }
            )
            builder.addCase(
                refreshSessionThunk.rejected, (state, action: PayloadAction<TGenericError | undefined>) => {
                    state.sessionErrorData = action.payload ?? null
                    state.sessionIsLoading = false
                }
            )
            builder.addCase(
                logoutThunk.pending, (state) => {
                    state.sessionIsLoading = true;
                    state.sessionErrorData = null
                }
            )
            builder.addCase(
                logoutThunk.fulfilled, (state) => {
                    state.sessionIsLoading = false;
                    state.accessToken = null;
                    state.sessionErrorData = null
                }
            )
            builder.addCase(
                logoutThunk.rejected, (state, action: PayloadAction<TGenericError | undefined>) => {
                    state.sessionIsLoading = false;
                    state.sessionErrorData = action.payload ?? null
                }
            )
        }
    }
)

export const {resetSessionErrorData} = sessionSlice.actions
export const sessionReducer = sessionSlice.reducer
