import axios from 'axios'

class Schedule {

    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:5000',
        })

        this.interceptor()
    }

    interceptor() {
        this.api.interceptors.request.use(async (config) => {
            try {

                console.log(config)
                const auth = JSON.parse(localStorage.getItem('auth'))
                auth ? this.token = auth.token : this.token = ''

                if (this.token) {
                    config.headers.Authorization = `Bearer ${this.token}`
                }
        
                return config
        
            } catch(err) {
        
        
            }
        })

        // RESPONSE
        this.api.interceptors.response.use((response) => response, (error) => {

            return Promise.reject(error)
            
        })
    }

    post(endpoint, params = {}) {
        return this.api.post(endpoint, params)
    }

    put(endpoint, params = {}) {
        return this.api.put(endpoint, params)
    }

    delete(endpoint) {
        return this.api.delete(endpoint)
    }

    get(endpoint) {
        return this.api.get(endpoint)
    }

}

export default new Schedule()