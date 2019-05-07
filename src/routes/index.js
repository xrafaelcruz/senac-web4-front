
import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Router } from 'react-router'
import { connect } from 'react-redux'

// Screens
import Home from 'screens/Home'

// Actions
import routesActions from 'routes/redux/actions'

const history = require('history')
const createdHistory = history.createBrowserHistory()

class Routes extends Component {

    componentDidUpdate() {
        const { routesState, goTo } = this.props
        
        const url = routesState.url

        if (url) {
            switch(url) {
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
        return (
            <Router history={createdHistory}>
                <Switch>
                    <Route exact path={'/'} component={Home} />
                    <Redirect from='*' to='/' />
                </Switch>
            </Router>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        routesState: state.routes,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        goTo: (url) => dispatch(routesActions.goTo(url)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
