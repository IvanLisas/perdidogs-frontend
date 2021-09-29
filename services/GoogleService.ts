import axios from 'axios'
import { GOOGLE_PACES_API_BASE_URL } from '../constants/Rest'

class GoogleService {
  key = 'AIzaSyD1GjXTowQyiuohojsHQ-Q-er9RJ4osIIQ'

  async getPredictions(keywork: string) {
    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?language=es-419&components=country:AR&key=${this.key}&input=${keywork}`
    return (await axios.post<any>(apiUrl)).data
  }

  async get(placeId: string) {
    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/details/json?language=es-419&key=${this.key}&place_id=${placeId}`
    return (await axios.post<any>(apiUrl)).data
  }
}

const googleService = new GoogleService()

export default googleService
