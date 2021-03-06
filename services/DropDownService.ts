import axios from 'axios'
import { SERVER_URL } from '../constants/Rest'
import { Breed } from '../types/models/Breed'
import { Color } from '../types/models/Color'
import { FurLength } from '../types/models/FurLength'
import { Size } from '../types/models/Size'

class DropDownService {
  async getAllBreeds(): Promise<Breed[]> {
    return (await axios.get<Breed[]>(`${SERVER_URL}/dropdown/breeds`)).data
  }

  async getAllColors(): Promise<Color[]> {
    return (await axios.get<Color[]>(`${SERVER_URL}/dropdown/colors`)).data
  }

  async getAllSizes(): Promise<Size[]> {
    return (await axios.get<Size[]>(`${SERVER_URL}/dropdown/sizes`)).data
  }

  async getAllLengths(): Promise<FurLength[]> {
    return (await axios.get<FurLength[]>(`${SERVER_URL}/dropdown/lengths`)).data
  }
}

const dropDownService = new DropDownService()

export default dropDownService
