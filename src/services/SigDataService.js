// This service file uses the axios object from http-common.js to send HTTP requests
import http from '@/http-common'

class SigDataService {
  getAll (params) {
    return http.get('/v1/Signals', { params })
  }
}
export default new SigDataService()
