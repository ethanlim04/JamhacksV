const haversine = (lat1, long1, lat2, long2) => {
    const r = 6371

    return (
        2 *
        r *
        Math.asin(
            Math.sqrt(
                Math.sin((lat2 - lat1) / 2) ** 2 +
                    Math.cos(lat1) * Math.cos(lat2) * Math.sin((long2 - long1) / 2) ** 2,
            ),
        )
    )
}

const sortData = (location, stores) => {
    // location: [lat, long] of current position
    // stores: unsorted array of [name, lat, long] sub arrays representing each store in db
    // num: optional number of stores to recieve. =< 0 -- all of them

    let storeArray = []
    let lat,
        long = location

    //convert dict to array
    for (const [key, value] of Object.entries(stores)) {
        storeArray.push([key, value[0], value[1]])
    }

    storeArray.sort(function (first, second) {
        let dist1 = haversine(first[1], first[2], lat, long)
        let dist2 = haversine(second[1], second[2], lat, long)

        if (dist1 > dist2) return 1
        if (dist2 > dist1) return 0
        return 0
    })

    //parse out lat/long info

    let names = []

    for (let storeData of storeArray) {
        names.push(storeData[0])
    }

    return names
}
