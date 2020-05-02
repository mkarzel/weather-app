import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pressureIcon from '../images/atmospheric-pressure.png';
import humidityIcon from '../images/humidity.png';
import windIcon from '../images/wind-speed.png';
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: '50vh',
    },
    currentDateText: {
        color: 'yellow',
        textAlign: 'center',
        fontSize: '2vw',
        '@media screen and (max-width: 600px)': {
            fontSize: '3vh',
        }
    },
    currentMeasurementsContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        paddingBottom: '2vw',
    },
    currentMeasurementContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    currentMeasurementText: {
        paddingLeft: '1vw',
        fontSize: '2vw',
        '@media screen and (max-width: 600px)': {
            fontSize: '2vh',
        }
    },
    currentIconSize: {
        width: '3vw',
        '@media screen and (max-width: 600px)': {
            width: '3vh',
        }
    },
    forecastContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        '@media screen and (max-width: 600px)': {
            flexDirection: 'column'
        }
    },
    forecastMeasurementsContainer: {
        '@media screen and (max-width: 600px)': {
            display: 'flex',
            justifyContent: 'space-evenly',
        }
    },
    forecastText: {
        paddingLeft: '0.5vw',
        fontSize: '1.5vw',
        '@media screen and (max-width: 600px)': {
            fontSize: '1.5vh'
        }
    },
    forecastDateText: {
        color: 'yellow',
        textAlign: 'center',
        fontSize: '2vw',
        '@media screen and (max-width: 600px)': {
            fontSize: '1.5vh'
        }
    },
    forecastIconSize: {
        width: '2vw',
        '@media screen and (max-width: 600px)': {
            width: '2.5vh'
        }
    },
    forecastDay: {
        display: 'flex',
        paddingBottom: '1vh',
        '@media screen and (max-width: 600px)': {
            justifyContent: 'center',
            width: '20vw',
        }
    }
});

const timestampToDate = (unixTimestamp, version) => {
    const milliseconds = unixTimestamp * 1000
    const dateObject = new Date(milliseconds)
    if (version === 'short')
        return dateObject.toLocaleString('pl-PL', { day: 'numeric', month: 'numeric' })
    else
        return dateObject.toLocaleString('pl-PL')
}


const key = `4c5fbd2fe1afe8b0cd155b79c2de7ef8`
let lat = 53.4327
let lng = 14.5481
const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${key}`

const WeatherData = () => {

    const classes = useStyles()

    const [data, setData] = useState(null)

    useEffect(() => {
        (async () => {
            const response = await axios.get(url);
            setData(response.data)
        })();
    }, []);

    const forecast = []

    if (data) {
        for (let i = 1; i < data.daily.length; i++) {
            forecast.push(
                <div className={classes.forecastMeasurementsContainer} key={i}>
                    <div className={classes.forecastDay}>
                        <img className={classes.forecastIconSize} alt={`weather icon`} src={`http://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`} />
                        <div className={classes.forecastText}>{data.daily[i].temp.day} &#8451;</div>
                    </div>
                    <div className={classes.forecastDay}>
                        <img className={classes.forecastIconSize} alt={`pressure icon`} src={pressureIcon} />
                        <span className={classes.forecastText}>{data.daily[i].pressure} hPa</span>
                    </div>
                    <div className={classes.forecastDay}>
                        <img className={classes.forecastIconSize} alt={`humidity icon`} src={humidityIcon} />
                        <span className={classes.forecastText}>{data.daily[i].humidity} %</span>
                    </div>
                    <div className={classes.forecastDay}>
                        <img className={classes.forecastIconSize} alt={`wind speed icon`} src={windIcon} />
                        <span className={classes.forecastText}>{data.daily[i].wind_speed} m/s</span>
                    </div>
                    <div className={classes.forecastDay}>
                        <div className={classes.forecastDateText}>{timestampToDate(data.daily[i].dt, 'short')}</div>
                    </div>
                </div>)
        }
    }

    return (
        <div>
            {data &&
                (<div className={classes.mainContainer}>
                    <div>
                        <div className={classes.currentDateText}>
                            <span>{timestampToDate(data.current.dt)}</span>
                        </div>
                        <div className={classes.currentMeasurementsContainer}>
                            <div className={classes.currentMeasurementContainer}>
                                <img className={classes.currentIconSize} alt={`weather icon`} src={`http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`} />
                                <span className={classes.currentMeasurementText}>{data.current.temp} &#8451;</span>
                            </div>
                            <div className={classes.currentMeasurementContainer}>
                                <img className={classes.currentIconSize} alt={`pressure icon`} src={pressureIcon} />
                                <span className={classes.currentMeasurementText}>{data.current.pressure} hPa</span>
                            </div>
                            <div className={classes.currentMeasurementContainer}>
                                <img className={classes.currentIconSize} alt={`humidity icon`} src={humidityIcon} />
                                <span className={classes.currentMeasurementText}>{data.current.humidity} %</span>
                            </div>
                            <div className={classes.currentMeasurementContainer}>
                                <img className={classes.currentIconSize} alt={`wind speed icon`} src={windIcon} />
                                <span className={classes.currentMeasurementText}>{data.current.wind_speed} m/s</span>
                            </div>
                        </div>
                    </div>
                    <div className={classes.forecastContainer}>
                        {forecast}
                    </div>
                </div>
                )
            }
        </div>
    );
}

export default WeatherData