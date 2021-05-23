export type Store = {
    thumbnail?: string
    name: string
    location: string
    coords: {
        lat: number
        lng: number
    }
    distance: number
    lastUpdated?: number
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
                            image?: string | null
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
