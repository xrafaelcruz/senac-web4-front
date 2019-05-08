import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

// Material UI
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'

const Login = () => (
    <div data-partial="login">
        <Paper className="box">
            <form noValidate autoComplete="off">
                <Grid container justify="center" spacing={16}>

                    <Grid item xs={12} sm={12}>
                        <TextField
                            label="Login"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <TextField
                            label="Senha"
                            type="password"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} style={{ textAlign: 'right' }}>
                        <Link component={RouterLink} to="/register">
                            cadastre-se aqui
                        </Link>
                    </Grid>

                    <Grid item xs={12} sm={12} className="grid-right-buttons"> 
                        <Button variant="contained" color="primary">
                            Entrar
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </Paper> 
    </div>
)

export default Login
