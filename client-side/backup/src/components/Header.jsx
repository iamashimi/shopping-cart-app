import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Menu } from 'semantic-ui-react'

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
        case null:
            return;
        case false:
            return <Menu.Item><Button as='a' primary href="/auth/login" content="Login" /></Menu.Item>
        default:
            return [
                <Menu.Item key={1} name="Products" href="/products"></Menu.Item>,
                // <Menu.Item key={2} name="Assets" href="/assets"></Menu.Item>,
                <Menu.Item key={3}><Button as='a' primary href="/api/logout" content="Logout" /></Menu.Item>
            ]
    }
  }

  render() {
    return (
        <Menu secondary size="huge">
            <Menu.Item 
                href={this.props.auth ? "/products" : "/"} 
                name="Shoping Cart Management System" 
            />
        
            <Menu.Menu position="right">
                {this.renderContent()}
            </Menu.Menu>
        </Menu>
    )
  }
}

function mapStateToProps({ auth }) {
    return { auth }
}

export default connect(mapStateToProps)(Header)