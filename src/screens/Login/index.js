import React from 'react'

import './style/style.css'

// Material UI
import Grid from '@material-ui/core/Grid'

// Screen
import Layout from 'layouts/screen'

// Partial
import LoginPartial from 'partials/Login'

const Login = () => (
    <Layout page="login">
        <Grid container justify="center" className="grid-center-content">
            <Grid item sm={3} xs={10}>
                <LoginPartial />               
            </Grid>
        </Grid>
    </Layout>
)

export default Login
