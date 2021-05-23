// https://gist.github.com/Luke-zhang-04/452a4d500b5246f0d98caad94ed8fb82

/**
 * Splits an array into chunks
 *
 * @param arr - Array to split
 * @param chunkSize - Size of array chunks
 */
export const arrayToChunks = <T>(arr: T[], chunkSize = 3): T[][] => {
    const chunks: T[][] = []

    for (let index = 0; index < arr.length; index += chunkSize) {
        chunks.push(arr.slice(index, index + chunkSize))
    }

    return chunks
}

export const getCoords = async (): Promise<{lat: number; lng: number} | undefined> => {
    try {
        const location = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation?.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
            })
        })

        return {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        }
    } catch (err) {
        console.error(err instanceof Error ? err.toString() : JSON.stringify(err))

        alert(err instanceof Error ? err.toString() : JSON.stringify(err))

        return
    }
}

export function timeDifference(previous: number): string
export function timeDifference(current: number, previous: number): string

/**
 * Calculates elapsed time between current and previous
 *
 * @param current - Current time
 * @param previous - Previous time
 * @returns Time difference
 */
export function timeDifference(current: number, previous?: number): string {
    const msPerMinute = 60 * 1000
    const msPerHour = msPerMinute * 60
    const msPerDay = msPerHour * 24
    const msPerMonth = msPerDay * 30
    const msPerYear = msPerDay * 365
    const elapsed = previous === undefined ? Date.now() - current : current - previous

    if (elapsed < msPerMinute) {
        return `${Math.round(elapsed / 1000)} seconds ago`
    } else if (elapsed < msPerHour) {
        return `${Math.round(elapsed / msPerMinute)} minutes ago`
    } else if (elapsed < msPerDay) {
        return `${Math.round(elapsed / msPerHour)} hours ago`
    } else if (elapsed < msPerMonth) {
        return `about ${Math.round(elapsed / msPerDay)} days ago`
    } else if (elapsed < msPerYear) {
        return `about ${Math.round(elapsed / msPerMonth)} months ago`
    }

    return `about ${Math.round(elapsed / msPerYear)} years ago`
}
