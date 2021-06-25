import axios from 'axios'

class ImageService {
  async savePhoto(capturedImage: any) {
    const source = capturedImage?.base64
    console.log('save', source)
    if (source) {
      let base64Img = `data:image/jpg;base64,${source}`
      let apiUrl = 'https://api.cloudinary.com/v1_1/ivanlisas/image/upload'
      let data = {
        file: base64Img,
        upload_preset: 'MyUploadPresent'
      }
      return (await axios.post<any>(`https://api.cloudinary.com/v1_1/ivanlisas/image/upload`, data)).data.secure_url
    }
  }
}

const imageService = new ImageService()

export default imageService
