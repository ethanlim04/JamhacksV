export type Store = {
    thumbnail?: string
    name: string
    location: string
    coords: LocationObj
    distance: number
    lastUpdated?: number
    busyness?: number
}

export type StoresFetch = {
    Stores: {
        [key: string]: {
            location: [lng: number, lat: number]
            UserReports: {
                time: {
                    [timestamp: number]: {
                        [username: string]: {
                            status: number
                            image?: null | bboolean
                        }
                    }
                }
            }
        }
    }
}

export type City = {
    Stores: {[key: string]: Store}
}

export type CitiesFetch = {
    Cities: {
        [city: string]: StoresFetch
    }
}
