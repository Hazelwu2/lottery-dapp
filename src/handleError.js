// Swal
import Swal from 'sweetalert2'

export const handleError = ({ reason, message }) => {

  message =
    message === 'Connector not found' ?
      '請先連接錢包' :
      message

  Swal.fire({
    icon: 'error',
    text: `Oops...${reason || message}`,
    title: '發生錯誤',
  })
}