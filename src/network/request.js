import axios from 'axios'

export default function request(config) {
    const instance = axios.create({
        baseURL: 'https://restapi.amap.com/v3/weather/weatherInfo?key=a79c2636d44f24475956c3b2ce27c91c',
        timeout: 5000
    })
    return instance(config)
}