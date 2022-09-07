// This service file uses the axios object from http-common.js to send HTTP requests
import axios from 'axios'
import baseAPI from '../http-common'

class SigDataService {
  getAll (params) {
    return axios.get(baseAPI.defaults.baseURL + '/v1/Signals',
      {
        params: params,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('userToken')
        }
      })
  }
}
export default new SigDataService()
