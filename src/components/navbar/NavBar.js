import React, { Component } from 'react';
import { Menu, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './NavBar.css';


export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: window.location.pathname,
            paths: ["/search"]
        }
    }

    handleItemClick = (e, { name }) => {
        this.setState({
            activeItem: name
        })
    }

    render() {
        let { paths, activeItem } = this.state;
        activeItem = paths.some((item) => item === activeItem) ? activeItem : "/search";

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
                    <Header as='h2' inverted color="white">
                        <Icon name='sun' />
                        <Header.Content>
                            adeziio
                            <Header.Subheader>Weather App</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Menu.Item>

                <Menu.Item
                    as={Link}
                    to='/search'
                    name='/search'
                    active={activeItem === '/search'}
                    onClick={this.handleItemClick}
                >
                    Search
                </Menu.Item>
            </Menu>
        )
    }
}