import axios from 'axios'
const axiosInstance  = axios.create({
    baseURL:'http://www.zzxbg.cn:3001',
    // baseURL:'http://localhost:3001',
    withCredentials:true
})
export default axiosInstance