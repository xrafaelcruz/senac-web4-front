import React from 'react'

// Material UI
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

// Screen
import Layout from 'screens/Layout'

const Login = () => (
    <Layout>
        <Grid container justify="center">
            <Grid item>
                <Paper className="box">
                    <form noValidate autoComplete="off">
                        <TextField
                            label="Login"
                            className="c1"
                            margin="normal"
                        />
                    </form>
                </Paper>                
            </Grid>
        </Grid>
    </Layout>
)

export default Login
