import React from "react"

export const LocationContext = React.createContext<{lat: number; lng: number} | undefined>()

export default LocationContext
