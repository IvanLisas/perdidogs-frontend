import axios from 'axios'
import { SERVER_URL } from '../constants/Rest'
import { Alert } from '../types/models/Alert'
import { NotificationDTO } from '../types/models/NotificationDTO'

class AlertService {
  axiosConfig = { timeout: 3000 }

  async create(alert: Alert): Promise<Alert> {
    return (await axios.post<Alert>(`${SERVER_URL}/alerts/`, alert, this.axiosConfig)).data
  }

  async getAll(userId: number): Promise<Alert[]> {
    return (await axios.get<Alert[]>(`${SERVER_URL}/alerts/by-user-id/${userId}`, this.axiosConfig)).data
  }

  async getAllActiveAlerts(userId: number): Promise<NotificationDTO[]> {
    return (await axios.get<NotificationDTO[]>(`${SERVER_URL}/notifications/by-user-id/${userId}`, this.axiosConfig)).data
  }

  async reject(postId: number, alertId: number): Promise<NotificationDTO> {
    return (await axios.put<NotificationDTO>(`${SERVER_URL}/notifications/reject`, { postId: postId, alertId: alertId }, this.axiosConfig)).data
  }

  async read(postId: number): Promise<NotificationDTO> {
    return (await axios.put<NotificationDTO>(`${SERVER_URL}/notifications/read`, { postId: postId }, this.axiosConfig)).data
  }

  async delete(alertId: number): Promise<Alert> {
    return (await axios.delete<Alert>(`${SERVER_URL}/alerts/${alertId}`, this.axiosConfig)).data
  }

  async update(alert: Alert): Promise<Alert> {
    return (await axios.put<Alert>(`${SERVER_URL}/alerts/`, alert, this.axiosConfig)).data
  }
}

const alertService = new AlertService()

export default alertService
