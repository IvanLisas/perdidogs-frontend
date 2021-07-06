export default function showError(error: any): string {
  console.log(error.response)
  if (error.response) return error.request._response //Response from backend server
  if (error.request) return 'No hay conexion con el servidor'
  //No response from backend
  else return 'Error'
}
