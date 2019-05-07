import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'

import './index.css'
import '@fortawesome/fontawesome-free/css/all.css'
import store from 'redux/store'
import Routes from 'routes'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <HelmetProvider>
                    <Routes />
                </HelmetProvider>
            </Provider>
        )
    }
}

export default App
