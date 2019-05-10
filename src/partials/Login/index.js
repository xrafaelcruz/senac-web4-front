import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { connect } from 'react-redux'

// Material UI
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'

// Helpers
import FormField from 'shared/FormField'
import Form from 'shared/Form'

// Actions
import loginActions from 'partials/Login/redux/actions'

class Login extends Component {

    state = {
        form: new Form({
            username: new FormField({ required: true }),
            password: new FormField({ required: true }),
        })
    }

    handleChangeInput = name => event => {
        const newState = { ...this.state }
        const form = newState.form

        switch(name) {
            case 'username':
                form.fields.username.value = event.target.value
                break

            case 'password':
                form.fields.password.value = event.target.value
                break

            default:
        }

        this.setState({ form: form })
    }

    handleSubmit = () => {
        const newState = { ...this.state }
        const form = newState.form

        const { username, password } = form.fields

        if (form.formValidate()) {

            this.props.login(username.value, password.value)

        }

        this.setState({ ...newState })
    }

    render() {
        const { form } = this.state

        return (
            <div data-partial="login">
                <Paper className="box">
                    <form noValidate autoComplete="off">
                        <Grid container justify="center" spacing={16}>
        
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label="Username"
                                    fullWidth
                                    error={form.fields.username.error}
                                    value={form.fields.username.value}
                                    onChange={this.handleChangeInput('username')}
                                />
                            </Grid>
        
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label="Senha"
                                    type="password"
                                    fullWidth
                                    error={form.fields.password.error}
                                    value={form.fields.password.value}
                                    onChange={this.handleChangeInput('password')}
                                />
                            </Grid>
        
                            <Grid item xs={12} sm={12} style={{ textAlign: 'right' }}>
                                <Link component={RouterLink} to="/register">
                                    cadastre-se aqui
                                </Link>
                            </Grid>
        
                            <Grid item xs={12} sm={12} className="grid-right-buttons"> 
                                <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                                    Entrar
                                </Button>
                            </Grid>
        
                        </Grid>
                    </form>
                </Paper> 
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        routesState: state.routes,
        loginState: state.login
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => dispatch(loginActions.login(username, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

