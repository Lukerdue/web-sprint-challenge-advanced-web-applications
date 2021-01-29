import {axiosWithAuth} from './axiosWithAuth'

export const fetchColors=()=>{
    return axiosWithAuth().get(`http://localhost:5000/api/colors`)
    .then(res=>{
      return res.data
    })
    .catch(drama=>{
      console.log("There was an error with your request")
      console.log(drama)
    })
}