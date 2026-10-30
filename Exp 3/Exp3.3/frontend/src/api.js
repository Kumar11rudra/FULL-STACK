import axios from 'axios'
const api=axios.create({baseURL:import.meta.env.VITE_API_URL || 'http://localhost:8080/api',timeout:12000})
api.interceptors.request.use(config=>{
 try{const auth=JSON.parse(sessionStorage.getItem('exp33-auth')||'{}');if(auth.token)config.headers.Authorization=`Bearer ${auth.token}`}catch{}
 return config
})
export const errorMessage=(error)=>error?.response?.data?.error || error?.response?.data?.message || error?.message || 'Something went wrong'
export default api
