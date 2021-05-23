export type Store = {
    thumbnail: string
    name: string
    location: string
    coords: {
        lat: number
        lng: number
    }
    distance: number
    lastUpdated: number
}
