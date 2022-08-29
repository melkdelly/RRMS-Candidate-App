import axios from 'axios'
export default axios.create({
  baseURL: 'https://grasperapi.azurewebsites.net/api',
  headers: {
    'Content-type': 'application/json'
  }
})
