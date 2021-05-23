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

    location = location.map(toRad)

    let storeArray = []
    let lat,
        long = location

    //convert dict to array
    for (const [key, value] of Object.entries(stores)) {
        storeArray.push([key, haversine(toRad(value[0]), toRad(value[1]), lat, long)])
    }

    storeArray.sort(function (first, second) {
        if (first[1] > second[1]) return 1
        return 0
    })

    return storeArray
}

const data = {
    Costco: [43.4457429, -80.5794693],
    Walmart: [43.4333036, -80.5577978],
    "Food Basics": [43.47274964997111, -80.59342506056647],
    "Domino's": [43.46753021963361, -80.5684578049693],
    "Sobey's": [43.46849903492878, -80.56811433491599],
}

console.log(sortData([43.44535015092781, -80.57957865759745], data))
