import { cookieMaxAge } from '../config'


export function setRefreshToken(token: string): void {
    document.cookie = `refreshToken=${encodeURIComponent(token)}; Path=/; SameSite=Lax; Max-Age=${cookieMaxAge}`
}
