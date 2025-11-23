import { getCookie } from './get-cookie'
import { store } from '../store'
import { refreshSessionThunk } from '../features/session/model/thunks/refresh-session'
import { refreshSessionTimeout } from '../config'


export function sessionRefresh() {
    async function inner() {
        const refreshToken = getCookie('refreshToken')

        if (refreshToken) {
            const refreshSessionBody = {refresh_token: refreshToken}
            try {
                store.dispatch(refreshSessionThunk(refreshSessionBody))
            }
            finally {
                setTimeout(inner, refreshSessionTimeout * 60 * 1000)
            }
        }
    }

    inner()
}
