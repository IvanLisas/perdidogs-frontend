class ImageService {
  async savePhoto(capturedImage: any): Promise<any> {
    const source = capturedImage?.base64
    console.log('save', source)
    if (source) {
      let base64Img = `data:image/jpg;base64,${source}`
      let apiUrl = 'https://api.cloudinary.com/v1_1/ivanlisas/image/upload'
      let data = {
        file: base64Img,
        upload_preset: 'MyUploadPresent'
      }

      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      })
        .then(async (response) => {
          let data = await response.json()
          if (data.secure_url) {
            console.log(data.secure_url)
            return data.secure_url
          }
        })
        .catch((err) => {
          alert('Cannot upload')
        })
    }
  }
}

const imageService = new ImageService()

export default imageService
