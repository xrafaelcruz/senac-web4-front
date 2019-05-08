import React, { Component } from 'react'

class Layout extends Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <div data-screen={this.props.page}>
                {this.props.children}
            </div>
        )
    }
    
}

export default Layout
