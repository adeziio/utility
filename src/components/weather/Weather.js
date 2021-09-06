import React, { Component } from 'react';
import { Input, Grid, Image, Button, Icon } from 'semantic-ui-react';
import './weather.css'

export default class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delayCounter: 0,
            expandHours: false,
            search: "",
            data: {}
        }
    }

    componentDidMount() {
        document.title = "Utility - Weather"
    }

    fetchData = (search) => {
        if (this.state.delayCounter === 1) {
            fetch("https://weatherapi-com.p.rapidapi.com/forecast.json?q=" + search + "&days=7", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
                    "x-rapidapi-key": process.env.REACT_APP_WEATHER_API_KEY
                }
            })
                .then(response => response.json())
                .then(resData => this.setState({ data: resData }))
        }
        this.setState({
            delayCounter: this.state.delayCounter - 1
        })
    }

    handleInput = (e) => {
        this.setState({
            search: e.target.value,
            delayCounter: this.state.delayCounter + 1
        }, () => {
            setTimeout(() => {
                this.fetchData(e.target.value);
            }, 1200)
        })
    }

    toggleExpandHours = () => {
        this.setState((prevState) => ({
            expandHours: !prevState.expandHours
        }))
    }

    convertToStandardTime = (time) => {
        let convertedTime = "";
        if (Number(time) < 12 && Number(time) > 0) {
            convertedTime = time + ":00 AM";
        }
        else if (Number(time) === 0) {
            convertedTime = "12:00 AM";
        }
        else if (Number(time) === 12) {
            convertedTime = "12:00 PM";
        }
        else {
            convertedTime = (time - 12) + ":00 PM";
        }
        return convertedTime;
    }

    formatDate = (date) => {
        const d = new Date(date + "T00:00:00");
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        return this.dayNumberToString(d.getDay()) + ` ${mo}-${da}-${ye}`;
    }

    dayNumberToString = (d) => {
        let day = ""
        switch (d) {
            case 0:
                day = "Sun";
                break;
            case 1:
                day = "Mon";
                break;
            case 2:
                day = "Tue";
                break;
            case 3:
                day = "Wed";
                break;
            case 4:
                day = "Thu";
                break;
            case 5:
                day = "Fri";
                break;
            case 6:
                day = "Sat";
                break;
            default:
                day = "";
        }
        return day;
    }

    refresh = () => {
        this.setState({
            delayCounter: this.state.delayCounter + 1
        }, () => {
            setTimeout(() => {
                this.fetchData(this.state.search);
            }, 1200)
        })
    }

    render() {
        const { data, expandHours } = this.state;

        return (
            <div>
                <Input placeholder='Search City or Zip Code' onChange={this.handleInput} />
                {data ?
                    <Grid relaxed centered stackable>
                        {data.current ?
                            <>
                                <Grid.Row columns={7} >
                                    <Grid.Column >
                                        <div className="condition">
                                            <Image src={data.current.condition.icon} centered />
                                            <div className="info"><Icon name='rain' />{`${data.forecast.forecastday[0].day.daily_chance_of_rain}%`}</div>
                                            <div className="info"><Icon name='snowflake' />{`${data.forecast.forecastday[0].day.daily_chance_of_snow}%`}</div>
                                            <div className="info-text">{data.current.condition.text}</div>
                                            <div className="temp-f">{`${data.current.temp_f}°F`}</div>
                                            <div className="temp-c">{`${data.current.temp_c}°c`}</div>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column >
                                        <div className="location">
                                            <Button icon onClick={this.refresh} className="info"><Icon name='refresh' /></Button>
                                            <div className="location-time">{` Last updated: 
                                                ${this.formatDate(data.current.last_updated.split(' ')[0])} 
                                                ${this.convertToStandardTime(data.current.last_updated.split(' ')[1].split(':')[0])} 
                                                ${data.location.tz_id}`}
                                            </div>
                                            <div className="location-name">{`${data.location.name},`}</div>
                                            <div className="location-name">{`${data.location.region}`}</div>
                                            <div className="location-name">{`${data.location.country}`}</div>
                                            <div className="info">
                                                <div><span className="bold">{`Humidity: `}</span>{`${data.current.humidity}%`}</div>
                                                <div><span className="bold">{`Wind: `}</span>{`${data.current.wind_dir} ${data.current.wind_mph} mph`}</div>
                                            </div>

                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                                <Button primary onClick={this.toggleExpandHours} className="info">{!expandHours ? "Expand Today's Hours" : "Hide Today's Hours"}</Button>
                                {expandHours ? (
                                    <>
                                        <Grid.Row columns={12} >
                                            {data.forecast.forecastday[0].hour ?
                                                data.forecast.forecastday[0].hour.filter((item, index) => index < 12).map((forecastday, index) => (
                                                    <Grid.Column key={index}>

                                                        <div className={"condition " +
                                                            (Number(forecastday.time.split(' ')[1].split(':')[0]) < Number(data.current.last_updated.split(' ')[1].split(':')[0]) ?
                                                                "highlight-gray " : "") +
                                                            (Number(forecastday.time.split(' ')[1].split(':')[0]) === Number(data.current.last_updated.split(' ')[1].split(':')[0]) ?
                                                                "highlight-yellow " : "")
                                                        }>
                                                            <div className="info">{`${forecastday.time.split(' ')[0]}`}</div>
                                                            <div className="info bold">{`${this.convertToStandardTime(forecastday.time.split(' ')[1].split(':')[0])}`}</div>
                                                            <Image src={forecastday.condition.icon} centered size="mini" />
                                                            <div className="info"><Icon name='rain' />{`${forecastday.chance_of_rain}%`}</div>
                                                            <div className="info"><Icon name='snowflake' />{`${forecastday.chance_of_snow}%`}</div>
                                                            <div className="info-text">{forecastday.condition.text}</div>
                                                            <div className="temp-f">{`${forecastday.temp_f}°F`}</div>
                                                            <div className="temp-c">{`${forecastday.temp_c}°c`}</div>
                                                        </div>
                                                    </Grid.Column>
                                                )) : null}
                                        </Grid.Row>
                                        <Grid.Row columns={12} >
                                            {data.forecast.forecastday[0].hour ?
                                                data.forecast.forecastday[0].hour.filter((item, index) => index >= 12).map((forecastday, index) => (
                                                    <Grid.Column key={index}>
                                                        <div className={"condition " +
                                                            (Number(forecastday.time.split(' ')[1].split(':')[0]) < Number(data.current.last_updated.split(' ')[1].split(':')[0]) ?
                                                                "highlight-gray " : "") +
                                                            (Number(forecastday.time.split(' ')[1].split(':')[0]) === Number(data.current.last_updated.split(' ')[1].split(':')[0]) ?
                                                                "highlight-yellow " : "")
                                                        }>
                                                            <div className="info">{`${forecastday.time.split(' ')[0]}`}</div>
                                                            <div className="info bold">{`${this.convertToStandardTime(forecastday.time.split(' ')[1].split(':')[0])}`}</div>
                                                            <Image src={forecastday.condition.icon} centered size="mini" />
                                                            <div className="info"><Icon name='rain' />{`${forecastday.chance_of_rain}%`}</div>
                                                            <div className="info"><Icon name='snowflake' />{`${forecastday.chance_of_snow}%`}</div>
                                                            <div className="info-text">{forecastday.condition.text}</div>
                                                            <div className="temp-f">{`${forecastday.temp_f}°F`}</div>
                                                            <div className="temp-c">{`${forecastday.temp_c}°c`}</div>
                                                        </div>
                                                    </Grid.Column>
                                                )) : null}
                                        </Grid.Row>
                                    </>) : null
                                }
                                <Grid.Row columns={1} >
                                    <Grid relaxed centered>
                                        <Grid.Row columns={3} divided>
                                            {data.forecast.forecastday ?
                                                data.forecast.forecastday.map((forecastday, index) => (
                                                    <Grid.Column key={index}>
                                                        <div className="condition border-top">
                                                            <div className="info">{`${this.formatDate(forecastday.date)}`}</div>
                                                            <Image src={forecastday.day.condition.icon} centered />
                                                            <div className="info"><Icon name='rain' />{`${forecastday.day.daily_chance_of_rain}%`}</div>
                                                            <div className="info"><Icon name='snowflake' />{`${forecastday.day.daily_chance_of_snow}%`}</div>
                                                            <div>{forecastday.day.condition.text}</div>
                                                            <div className="temp-f">{`${forecastday.day.avgtemp_f}°F`}</div>
                                                            <div className="temp-c">{`${forecastday.day.avgtemp_c}°c`}</div>
                                                        </div>
                                                    </Grid.Column>
                                                )) : null}
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Row>
                            </> : null
                        }



                    </Grid> : null
                }


            </div>
        )
    }
}
