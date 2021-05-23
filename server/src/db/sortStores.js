const toRad = (n) => (n * Math.PI) / 180

/**
 * The haversine formula determines the great-circle distance between two points on a sphere given
 * their longitudes and latitudes. Important in navigation, it is a special case of a more general
 * formula in spherical trigonometry, the law of haversines, that relates the sides and angles of
 * spherical triangles.
 *
 * @param {number} lat1 - Latitude coordinate 1
 * @param {number} long1 - Longitude coordinate 1
 * @param {number} lat2 - Latitude coordinate 2
 * @param {number} long2 - Longitude coordinate 2
 * @returns {number} Distance between lat1 long2 and lat2 long2
 * @see {@link https://en.wikipedia.org/wiki/Haversine_formula}
 */
export const haversine = (lat1, long1, lat2, long2) =>
    12742 *
    Math.asin(
        Math.sqrt(
            Math.sin((lat2 - lat1) / 2) ** 2 +
                Math.cos(lat1) * Math.cos(lat2) * Math.sin((long2 - long1) / 2) ** 2,
        ),
    )

export const sortData = (location, stores) => {
    // location: [lat, long] of current position
    // stores: unsorted array of [name, lat, long] sub arrays representing each store in db
    // num: optional number of stores to recieve. =< 0 -- all of them

    let storeArray = []
    let lat = toRad(location[0])
    let long = toRad(location[1])

    //convert dict to array
    for (const [key, value] of Object.entries(stores)) {
        // console.log(lat)
        storeArray.push([key, haversine(lat, long, toRad(value[0]), toRad(value[1]))])
    }

    storeArray.sort(function (first, second) {
        if (first[1] > second[1]) return 1
        return -1
    })

    return storeArray
}
