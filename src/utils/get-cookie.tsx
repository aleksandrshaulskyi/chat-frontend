export function getCookie(name: string): string | null {
    const matchedCookie = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
    )

    return matchedCookie ? decodeURIComponent(matchedCookie[1]) : null
}
