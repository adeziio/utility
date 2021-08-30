import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';

export default class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }

    fetchData = (search) => {
        fetch("https://weatherapi-com.p.rapidapi.com/forecast.json?q=" + search, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
                "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY
            }
        })
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {

        return (
            <div>
                <Input placeholder='Search City or Zip Code' />
            </div>
        )
    }
}
