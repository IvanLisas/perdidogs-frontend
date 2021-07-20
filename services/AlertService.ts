import axios from 'axios'
import { SERVER_URL } from '../constants/Rest'
import { Alert } from '../types/models/Alert'
import { NotificationDTO } from '../types/models/NotificationDTO'

class AlertService {
  axiosConfig = { timeout: 3000 }

  async create(alert: Alert): Promise<Alert> {
    console.log(alert.pet)
    return (await axios.post<Alert>(`${SERVER_URL}/alerts/`, alert, this.axiosConfig)).data
  }

  async getAll(userId: number | undefined): Promise<Alert[]> {
    return (await axios.get<Alert[]>(`${SERVER_URL}/alerts/by-user-id/${userId}`, this.axiosConfig)).data
  }

  async getAllActiveAlerts(userId: number): Promise<NotificationDTO[]> {
    return (await axios.get<NotificationDTO[]>(`${SERVER_URL}/notifications/by-user-id/${userId}`, this.axiosConfig)).data
  }
}

const alertService = new AlertService()

export default alertService
