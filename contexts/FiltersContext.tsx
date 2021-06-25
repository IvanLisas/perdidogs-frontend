import React, { createContext, useState } from 'react'
import { Point } from 'react-native-google-places-autocomplete'
import { Filter } from '../types/models/Filter'
import { Pet } from '../types/models/Pet'

interface ContextProps {
  readonly pet: Pet | undefined
  readonly myLocation: Point | undefined
  readonly searchLocation: Point | undefined
  readonly searchLocationDelta: Point | undefined
  readonly setPet: (value: Pet | undefined) => void
  readonly setMyLocation: (value: Point) => void
  readonly setSearchLocation: (value: Point) => void
  readonly setSearchLocationDelta: (value: Point) => void
}

const FilterContext = createContext<ContextProps>({
  pet: undefined,
  setPet: () => null,
  searchLocationDelta: undefined,
  myLocation: undefined,
  setMyLocation: () => null,
  searchLocation: undefined,
  setSearchLocation: () => null,
  setSearchLocationDelta: () => null
})

export const FilterContextProvider: React.FC = ({ children }) => {
  const [pet, setPet] = useState<Pet | undefined>()
  const [myLocation, setMyLocation] = useState<Point | undefined>()
  const [searchLocation, setSearchLocation] = useState<Point | undefined>()
  const [searchLocationDelta, setSearchLocationDelta] = useState<Point | undefined>()
  return (
    <FilterContext.Provider
      value={{ pet, setPet, myLocation, setMyLocation, searchLocation, setSearchLocation, setSearchLocationDelta, searchLocationDelta }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export default FilterContext
