import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './index.css'
import '@fortawesome/fontawesome-free/css/all.css'
import store from 'redux/store'
import Routes from 'routes'

const theme = createMuiTheme({
    palette: {
      primary: { main: '#2095f2' },
    },
    typography: {
        useNextVariants: true,
    },
  });

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider theme={theme}>
                    <HelmetProvider>
                        <Routes />
                    </HelmetProvider>
                </MuiThemeProvider>
            </Provider>
        )
    }
}

export default App
