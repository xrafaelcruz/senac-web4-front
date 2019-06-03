import React from 'react'
import { Provider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

// Assets
import 'assets/styles/0-all.css'
import '@fortawesome/fontawesome-free/css/all.css'

// Variables
import store from 'redux/store'
import Routes from 'routes'

const theme = createMuiTheme({
	palette: {
		primary: { main: '#2095f2' }
	},
	typography: {
		useNextVariants: true
	}
})

const App = () => (
	<Provider store={store}>
		<MuiThemeProvider theme={theme}>
			<Routes />
		</MuiThemeProvider>
	</Provider>
)

export default App
