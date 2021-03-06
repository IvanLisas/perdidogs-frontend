import React, { createContext, useCallback, useRef, useState } from 'react'
import { User } from '../types/models/User'
import useLocalStorage from '../hooks/useLocalStorage'
import MapView from 'react-native-maps'

interface ContextProps {
  readonly mapRef: React.RefObject<MapView> | null
  readonly setMapRef: (mapRef: React.RefObject<MapView> | null) => void
  readonly handleNavigateToPoint: (lat: number, long: number) => void
}

const DEVIATION = 0.0002
const MapContext = createContext<ContextProps>({
  mapRef: null,
  setMapRef: () => null,
  handleNavigateToPoint: () => null
})

export const MapContextProvider: React.FC = ({ children }) => {
  const [mapRef, setMapRef] = useState<React.RefObject<MapView> | null>(useRef<MapView>(null))
  /*  const mapRef = useRef<MapView>(null) */
  const handleNavigateToPoint = useCallback(
    (lat, long, zoom?) => {
      if (mapRef) {
        mapRef.current?.animateCamera(
          {
            center: {
              latitude: lat - DEVIATION,
              longitude: long
            },
            zoom: zoom ? zoom : 14.5
          },
          { duration: 500 }
        )
      }
    },
    [mapRef]
  )

  return <MapContext.Provider value={{ mapRef, setMapRef, handleNavigateToPoint }}>{children}</MapContext.Provider>
}

export default MapContext
