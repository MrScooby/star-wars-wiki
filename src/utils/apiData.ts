export const getIDfromUrl = (url?: string): string | undefined => {
    if (!url) return

    return url.match(/\/([^\/]+)\/?$/)?.[1]
}

export const getIDsFromUrls = (urls: Array<string>): Array<string | undefined> => {
    if (!urls || (urls.length === 0)) return []

    return urls.map(url => getIDfromUrl(url))
}