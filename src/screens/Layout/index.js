import React, { useEffect, Fragment } from 'react'

const Layout = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0)
        console.log('scroll top')
    })

    return (
        <Fragment>
            { props.children }
        </Fragment>
    )

}

export default Layout
