import axios from 'axios'
let axiosInstance  = axios.create({
    baseURL:'http://localhost:3001',
    timeout:2000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        // 'Origin':'http://localhost:3000'
      },
    withCredentials:true
})
export default axiosInstance