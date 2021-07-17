import { Breed } from './Breed'
import { Color } from './Color'
import { FurLength } from './FurLength'
import { Size } from './Size'

export type Pet = {
  Id?: number
  name?: string
  sex?: string
  hasCollar?: boolean
  furLength?: FurLength
  breed?: Breed
  color?: Color
  size?: Size
}
