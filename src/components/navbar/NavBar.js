import React, { Component } from 'react';
import { Menu, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './NavBar.css';


export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: window.location.pathname,
            paths: ["/home", "/weather"]
        }
    }

    handleItemClick = (e, { name }) => {
        this.setState({
            activeItem: name
        })
    }

    render() {
        let { paths, activeItem } = this.state;
        activeItem = paths.some((item) => item === activeItem) ? activeItem : "/home";
        return (
            <Menu
                size="large"
                secondary
                inverted
                color="blue"
                // widths={3} 
                className="navbar-container"
            >
                <Menu.Item>
                    <Header as='h2' inverted color="green">
                        <Icon name='game' />
                        <Header.Content>
                            adeziio
                            <Header.Subheader>Utility App</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Menu.Item>
                <Menu.Item
                    as={Link}
                    to='/home'
                    name='/home'
                    active={activeItem === '/home'}
                    onClick={this.handleItemClick}
                >
                    Home
                </Menu.Item>
                <Menu.Item
                    as={Link}
                    to='/weather'
                    name='/weather'
                    active={activeItem === '/weather'}
                    onClick={this.handleItemClick}
                >
                    Weather
                </Menu.Item>
            </Menu>
        )
    }
}