import React, { Component } from 'react'
import MaskedInput from 'react-text-mask'
import { withRouter } from 'react-router-dom'
import service from 'services/api'
import { connect } from 'react-redux'

// Material UI
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

// Helpers
import FormField from 'shared/FormField'
import Form from 'shared/Form'

// Actions
import routesActions from 'routes/redux/actions'

function TextMaskCustom(props) {
    const { inputRef, ...other } = props

    return (
        <MaskedInput
            {...other}
            ref={ref => inputRef(ref ? ref.inputElement : null)}
            mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    )
}

const ButtonCancel = withRouter(({ history }) => (
    <Button style={{ marginRight: 16 }} onClick={() => { history.push('/login') }}>
        Cancelar
    </Button>
))

class RegisterForm extends Component {

    state = {
        form: new Form({
            name: new FormField({ required: true }),
            email: new FormField({ required: true, email: true }),
            phone: new FormField({ required: true, minLength: 15 }, '(51)    -    '),
            username: new FormField({ required: true }),
            password: new FormField({ required: true })
        })
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        })
    }

    handleChangeInput = name => event => {
        const newState = { ...this.state }
        const form = newState.form

        switch(name) {
            case 'name':
                form.fields.name.value = event.target.value
                break

            case 'email':
                form.fields.email.value = event.target.value
                break

            case 'phone':
                form.fields.phone.value = event.target.value
                break

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
        
        if (form.formValidate()) {

            service.post('user', {
                name: form.fields.name.value,
                email: form.fields.email.value,
                phone: form.fields.phone.value,
                username: form.fields.username.value,
                password: form.fields.password.value
            })
            .then(response => {
                
               this.props.goTo('/login')

            }).catch((error) => {

                console.log(error)

            })

        }

        this.setState({ ...newState })
    }

    render() {
        const { form } = this.state

        return(
            <div data-partial="register-form">
                <Paper className="box">
                    <form onSubmit={this.handleSubmit}>
                        <Grid container justify="center">
        
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label="Nome"
                                    margin="normal"
                                    fullWidth
                                    error={form.fields.name.error}
                                    value={form.fields.name.value}
                                    onChange={this.handleChangeInput('name')}
                                />
                            </Grid>
        
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label="Email"
                                    margin="normal"
                                    type="email"
                                    fullWidth
                                    error={form.fields.email.error}
                                    value={form.fields.email.value}
                                    onChange={this.handleChangeInput('email')}
                                />
                            </Grid>
        
                            <Grid item xs={12} sm={12}>
                                <FormControl style={{ marginTop: 16 }} fullWidth error={form.fields.phone.error}>
                                    <InputLabel htmlFor="formatted-text-mask-input">Telefone</InputLabel>
                                    <Input
                                        id="formatted-text-mask-input"
                                        inputComponent={TextMaskCustom}
                                        value={form.fields.phone.value}
                                        onChange={this.handleChangeInput('phone')}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label="Login"
                                    margin="normal"
                                    fullWidth
                                    error={form.fields.username.error}
                                    value={form.fields.username.value}
                                    onChange={this.handleChangeInput('username')}
                                />
                            </Grid>
        
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label="Senha"
                                    margin="normal"
                                    type="password"
                                    fullWidth
                                    error={form.fields.password.error}
                                    value={form.fields.password.value}
                                    onChange={this.handleChangeInput('password')}
                                />
                            </Grid>
        
                            <Grid item xs={12} sm={12} className="grid-right-buttons"> 
                                <ButtonCancel />

                                <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                                    Cadastrar
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        goTo: (url) => dispatch(routesActions.goTo(url)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
