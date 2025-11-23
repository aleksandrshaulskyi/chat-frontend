export type TRefreshSessionRequest = {
    refresh_token: string,
}

export type TRefreshSessionResponseRaw = {
    access_token: string,
    refresh_token: string,
}

export type TRefreshSessionResponseClean = {
    accessToken: string,
    refreshToken: string,
}
