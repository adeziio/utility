import React, { Component } from 'react';
import { Image, Grid } from 'semantic-ui-react';
import weatherImg from '../../img/img-weather.jpg';

export default class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        document.title = "Utility - Home"
    }

    render() {
        return (
            <div>
                <Grid centered stackable>
                    <Grid.Row columns={10} >
                        <Grid.Column >
                            <Image
                                className="home-icon"
                                src={weatherImg}
                                as='a'
                                size='small'
                                href='/weather'
                                target='_blank'
                                circular
                                bordered
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div >
        )
    }
}