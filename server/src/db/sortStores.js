const toRad = (n) => (n * Math.PI) / 180

const haversine = (lat1, long1, lat2, long2) => {
    // const r = 6371
    return (
        12742 *
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
    let lat = toRad(location[0])
    let long = toRad(location[1])

    //convert dict to array
    for (const [key, value] of Object.entries(stores)) {
        console.log(lat)
        storeArray.push([key, haversine(lat, long, toRad(value[0]), toRad(value[1]))])
    }

    storeArray.sort(function (first, second) {
        if (first[1] > second[1]) return 1
        return -1
    })

    return storeArray
}
