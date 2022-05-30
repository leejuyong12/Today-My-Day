import axios from 'axios'

const Axios = axios.create({
  baseURL: 'http://k6c205.p.ssafy.io:8080/api/',
  // baseURL: 'http://localhost:8080/api/',
  headers: {
    'Content-type': 'application/json',
  },
})

const getAxios = () => {
  return Axios
}

export { getAxios }
