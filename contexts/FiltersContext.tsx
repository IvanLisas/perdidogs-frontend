import React, { createContext, useState } from 'react'
import { Point } from 'react-native-google-places-autocomplete'
import { Filter } from '../types/models/Filter'
import { Pet } from '../types/models/Pet'

interface ContextProps {
  readonly pet: Pet | undefined
  readonly myLocation: Point | undefined
  readonly searchLocation: Point | undefined
  readonly setPet: (value: Pet) => void
  readonly setMyLocation: (value: Point) => void
  readonly setSearchLocation: (value: Point) => void
}

const FilterContext = createContext<ContextProps>({
  pet: undefined,
  setPet: () => null,
  myLocation: undefined,
  setMyLocation: () => null,
  searchLocation: undefined,
  setSearchLocation: () => null
})

export const FilterContextProvider: React.FC = ({ children }) => {
  const [pet, setPet] = useState<Pet | undefined>()
  const [myLocation, setMyLocation] = useState<Point | undefined>()
  const [searchLocation, setSearchLocation] = useState<Point | undefined>()

  return (
    <FilterContext.Provider value={{ pet, setPet, myLocation, setMyLocation, searchLocation, setSearchLocation }}>{children}</FilterContext.Provider>
  )
}

export default FilterContext
