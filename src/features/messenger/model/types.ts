export enum MessageStatus {
	sent = 'sent',
	delivered = 'delivered',
	read = 'read',
}

export type TMessage = {
	id: number | null,
	client_message_id: string,
	chat_id: string,
	sender_id: number | null,
	recipient_id: number,
	status: MessageStatus,
	sent_at: string,
	delivered_at: string | null,
	body: string,
	is_edited: boolean,
	is_deleted: boolean,
}

export type TGetMessagesPayload = {
	accessToken: string,
	chatId: string,
	cursor: string | null,
}

export type TGetMessagesResponse = {
	messages: TMessage[],
	cursor: string,
	previous_messages_exist: boolean,
}

export type TMessageProcessed = {
	id: number | null,
	client_message_id: string,
	sender_id: number | null,
	recipient_id: number,
	status: MessageStatus,
	sent_at: string,
	delivered_at: string | null,
	body: string,
	is_edited: boolean,
	is_deleted: boolean,
	avatarUrl: string,
	username: string,
}

export type TMessengerInitialState = {
	isConnected: boolean,
	isLoading: boolean,
    error: string | null,
    messages: TMessage[],
	cursor: string | null,
	previousMessagesExist: boolean,
}

export type TMessageProps = TMessageProcessed & {currentUserId: number | null}
