import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Router } from 'react-router'
import { connect } from 'react-redux'

// Screens
import Home from 'screens/Home'
import Login from 'screens/Login'
import Register from 'screens/Register'

// Actions
import routesActions from 'routes/redux/actions'

const history = require('history')
const createdHistory = history.createBrowserHistory()

class Routes extends Component {
	componentDidUpdate() {
		const { routesState, goTo } = this.props

		const url = routesState.url

		if (url) {
			switch (url) {
				case 'back':
					createdHistory.goBack()
					break

				case 'forward':
					createdHistory.goForward()
					break

				default:
					createdHistory.push(url)
			}

			window.scrollTo(0, 0)

			goTo(null)
		}
	}

	render() {
		const { loginState } = this.props

		return (
			<Router history={createdHistory}>
				<Switch>
					{loginState.isLoggedIn && <Route exact path={'/'} component={Home} />}
					{loginState.isLoggedIn && (
						<Route exact path={'/home'} component={Home} />
					)}

					{!loginState.isLoggedIn && (
						<Route exact path={'/login'} component={Login} />
					)}
					{!loginState.isLoggedIn && (
						<Route exact path={'/register'} component={Register} />
					)}

					{loginState.isLoggedIn && <Redirect from="*" to="/" />}
					{!loginState.isLoggedIn && <Redirect from="*" to="/login" />}
				</Switch>
			</Router>
		)
	}
}

const mapStateToProps = state => {
	return {
		routesState: state.routes,
		loginState: state.login
	}
}

const mapDispatchToProps = dispatch => {
	return {
		goTo: url => dispatch(routesActions.goTo(url))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Routes)
