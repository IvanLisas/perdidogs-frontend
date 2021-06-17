import { Breed } from './Breed'
import { Fur } from './Fur'
import { Size } from './Size'

export type Pet = {
  Id: number
  name: string
  sex: string
  hasCollar: boolean
  fur: Fur
  breed: Breed
  size: Size
}
