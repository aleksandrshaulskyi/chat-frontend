import { TGenericError } from '../../../types/generic-error'


export interface IUserInterface {
    id: number | null,
    username: string | null,
    email: string | null,
    avatar_url: string | null,
}

export interface IUserStateInterface {
    userIsLoading: boolean,
    userData: IUserInterface | null,
    userErrorData: TGenericError | null,
}

export type TUpdateAvatarData = {
    avatar: File,
    accessToken: string,
}

export type TUpdateAvatarResponse = {
    avatar_url: string,
}

export type TUpdateUserData = {
    accessToken: string,
    updateUserForm: Record<string, string>,
}

export type TCreateUserRequest = {
    username: string,
    password: string,
    email: string
}
