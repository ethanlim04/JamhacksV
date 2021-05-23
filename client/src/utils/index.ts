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
