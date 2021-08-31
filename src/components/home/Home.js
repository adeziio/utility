import React, { Component } from 'react';
import { Image, Grid } from 'semantic-ui-react';
import cloudImg from '../../img/img-cloud.jpg';

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
                <Grid columns={2} relaxed='very' centered stackable>
                    <Grid.Column
                        width={2}
                    >
                        <Image
                            src={cloudImg}
                            as='a'
                            size='small'
                            href='/weather'
                            target='_blank'
                            circular
                        />
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}