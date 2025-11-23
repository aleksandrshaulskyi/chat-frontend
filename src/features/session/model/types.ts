import { TGenericError } from '../../../types/generic-error'


export interface ISessionState {
    sessionIsLoading: boolean,
    accessToken: string | null,
    sessionErrorData: TGenericError | null,
}

export type TLoginRequest = {
    username: string,
    password: string,
}

export type TLoginResponse = {
    access_token: string,
    refresh_token: string,
}

export type TRefreshSessionRequest = {
    refresh_token: string,
}

export type TRefreshSessionResponse = {
    access_token: string,
    refresh_token: string,
}

export type TLogoutData = {
    accessToken: string,
    all: boolean,
}
