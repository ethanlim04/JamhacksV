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

/**
 * Calculates elapsed time between `Date.now()` and previous
 *
 * @param previous - Previous time
 * @returns Time difference
 */
export function timeDifference(previous: number): string

/**
 * Calculates elapsed time between current and previous
 *
 * @param current - Current time
 * @param previous - Previous time
 * @returns Time difference
 */
export function timeDifference(current: number, previous: number): string

export function timeDifference(current: number, previous?: number): string {
    const msPerMinute = 60 * 1000
    const msPerHour = msPerMinute * 60
    const msPerDay = msPerHour * 24
    const msPerMonth = msPerDay * 30
    const msPerYear = msPerDay * 365
    const elapsed = previous === undefined ? Date.now() - current : current - previous

    let n = 0
    let s = ""

    if (elapsed < msPerMinute) {
        n = Math.round(elapsed / 1000)
        s = "second"
    } else if (elapsed < msPerHour) {
        n = Math.round(elapsed / msPerMinute)
        s = "minute"
    } else if (elapsed < msPerDay) {
        n = Math.round(elapsed / msPerHour)
        s = "hour"
    } else if (elapsed < msPerMonth) {
        n = Math.round(elapsed / msPerDay)
        s = "day"
    } else if (elapsed < msPerYear) {
        n = Math.round(elapsed / msPerMonth)
        s = "month"
    } else {
        n = Math.round(elapsed / msPerYear)
        s = "year"
    }

    return `${n} ${s + (n == 1 ? "" : "s")} ago`
}
