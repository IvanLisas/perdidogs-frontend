import { Point } from 'react-native-google-places-autocomplete'
import { Location } from './Location'
import { Pet } from './Pet'

export type Filter = {
  pet?: Pet
  myLocation?: Point
  searchLocation: Point
  deltaLocation: Point
}
