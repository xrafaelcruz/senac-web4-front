import axios from 'axios'

class Schedule {
	constructor() {
		this.api = axios.create({
			baseURL: 'http://localhost:5000'
		})

		this.interceptor()
	}

	interceptor() {
		this.api.interceptors.request.use(async params => {
			try {
				const token = JSON.parse(localStorage.getItem('token'))

				if (token) {
					params.headers.Authorization = `Bearer ${token}`
				}

				return params
			} catch (err) {
				console.log(err)
			}
		})

		// RESPONSE
		this.api.interceptors.response.use(
			response => response,
			error => {
				return Promise.reject(error)
			}
		)
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
