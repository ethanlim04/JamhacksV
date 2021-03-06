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

export const getCoords = async (): Promise<LocationObj | undefined> => {
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

const toRad = (deg: number): number => (deg * Math.PI) / 180

/**
 * The haversine formula determines the great-circle distance between two points on a sphere given
 * their longitudes and latitudes. Important in navigation, it is a special case of a more general
 * formula in spherical trigonometry, the law of haversines, that relates the sides and angles of
 * spherical triangles.
 *
 * @param lat1 - Latitude coordinate 1
 * @param long1 - Longitude coordinate 1
 * @param lat2 - Latitude coordinate 2
 * @param long2 - Longitude coordinate 2
 * @returns Distance between lat1 long2 and lat2 long2
 * @see {@link https://en.wikipedia.org/wiki/Haversine_formula}
 */
export const haversine = (lat1: number, long1: number, lat2: number, long2: number): number => {
    const radLat1 = toRad(lat1)
    const radLong1 = toRad(long1)
    const radLat2 = toRad(lat2)
    const radLong2 = toRad(long2)

    return Math.abs(
        12742 *
            Math.asin(
                Math.sqrt(
                    Math.sin((radLat2 - radLat1) / 2) ** 2 +
                        Math.cos(radLat1) *
                            Math.cos(radLat2) *
                            Math.sin((radLong2 - radLong1) / 2) ** 2,
                ),
            ),
    )
}

export const roundTo = (num: number, precision: number): number =>
    Math.round(num * 10 ** precision) / 10 ** precision

export const formatDistance = (km: number): string => {
    if (km > 500) {
        return `${roundTo(km, -(Math.floor(km).toString().length - 1)).toLocaleString()}km`
    } else if (km > 100) {
        return `${roundTo(km, -1).toLocaleString()}km`
    } else if (km > 50) {
        return `${Math.round(km).toLocaleString()}km`
    }

    const distance = roundTo(km, 3)
    const whole = Math.floor(distance)

    if (km >= 1) {
        const meters = Math.round((distance - whole) * 10)

        return `${whole}.${meters}km`
    }

    const meters = Math.round((distance - whole) * 10 ** 3)

    return `${meters}m`
}
