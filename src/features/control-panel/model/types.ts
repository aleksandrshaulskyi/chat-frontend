export type TFoundUser = {
    id: number,
    username: string,
    email: string,
    avatar_url: string,
}

export type TChatUser = {
    id?: number,
    username?: string,
    email?: string,
    avatar_url?: string,
}

export type TChat = {
    id: string | null,
    related_users: Array<TChatUser>,
}

export type TCreateChatPayload = {
    accessToken: string,
    user_ids: any[],
}

export type TChats = {
    isLoading: boolean,
    error: any,
    selectedChat: TChat | null,
    chats: TChat[],
}

export type TChatProps = TChat & {'currentUserId': number}

