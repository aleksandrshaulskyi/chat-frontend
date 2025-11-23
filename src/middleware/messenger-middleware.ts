import { Middleware } from '@reduxjs/toolkit'

import { messengerActions } from '../features/messenger/model/messenger-slice'


export const messengerMiddleware: Middleware = store => {
	let webSocket: WebSocket | null = null

	return next => action => {
		const { dispatch } = store
		const { type, payload } = action as { type: string; payload?: any }

		switch (type) {
			case messengerActions.connect.type: {
				if (webSocket && (
                    webSocket.readyState === WebSocket.OPEN ||
                    webSocket.readyState === WebSocket.CONNECTING
                )) break

				webSocket = new WebSocket(payload.url)

				webSocket.onopen = () => dispatch(messengerActions.onOpen())
				webSocket.onmessage = message =>
					dispatch(messengerActions.onMessage(JSON.parse(message.data)))
				webSocket.onclose = () => {
					dispatch(messengerActions.onClose())
					webSocket = null
				}
				break
			}

			case messengerActions.send.type: {
				if (webSocket && webSocket.readyState === WebSocket.OPEN) {
					webSocket.send(JSON.stringify(payload))
				} else {
					console.warn('WebSocket is not open. Cannot send message.')
				}
				break
			}

			case messengerActions.disconnect.type: {
				if (webSocket) {
					webSocket.close()
					webSocket = null
				}
				break
			}
		}

		return next(action)
	}
}
