import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

import Layout from 'screens/Layout'

const Home = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    })

    return (
        <Layout>
            <Helmet>
                <title>Cadastro de </title>
            </Helmet>
            
            <h1>Home</h1>
        </Layout>
    )
}

export default Home
