import React from 'react'

// Material UI
import Grid from '@material-ui/core/Grid'

// Screen
import Layout from 'layouts/screen'

// Partial
import Form from 'partials/Register/Form'

const Register = () => (
    <Layout page="Register">
        <Grid container justify="center" className="grid-center-content">
            <Grid item sm={3} xs={10}>
                <Form />               
            </Grid>
        </Grid>
    </Layout>
)

export default Register
