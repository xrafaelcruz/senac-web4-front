import { combineReducers } from 'redux'

// Routes
import routes from 'routes/redux/reducer'

// Partials
import login from 'partials/Login/redux/reducer'

export default combineReducers({ 
    routes,
    login,
})
