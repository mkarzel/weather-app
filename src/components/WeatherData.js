import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pressureIcon from '../images/atmospheric-pressure.png'
import humidityIcon from '../images/humidity.png'
import windIcon from '../images/wind-speed.png'
import { Button, ButtonGroup } from '@material-ui/core';

const mainContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '40vh',
}

const measurementsContainer = {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginBottom: '2vw',
}

const measurementContainer = {
    display: 'flex',
    alignItems: 'center',
}

const measurementText = {
    paddingLeft: '1vw',
    fontSize: '2vw',
}

const buttonContainer = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1vw',
    marginBottom: '1vw',
}

const buttonStyle = {
    width: '10vw',
    fontWeight: 'bold'
}

const iconSize = {
    width: '4vw'
}

const dateText = {
    fontSize: '2vw',
    color: 'yellow',
    textAlign: 'center'
}

const timestampToDate = (unixTimestamp, version) => {
    const milliseconds = unixTimestamp * 1000
    const dateObject = new Date(milliseconds)
    if (version === 'short')
        return dateObject.toLocaleString('pl-PL', { day: 'numeric', month: 'numeric', year: 'numeric' })
    else
        return dateObject.toLocaleString('pl-PL')
}

const key = `4c5fbd2fe1afe8b0cd155b79c2de7ef8`
let lat = 53.4327
let lng = 14.5481
const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${key}`

const WeatherData = () => {

    const [data, setData] = useState(null)
    const [day, setDay] = useState(0)

    useEffect(() => {
        (async () => {
            const response = await axios.get(url);
            setData(response.data)
        })();
    }, []);

    return (
        <div>
            {day === 0 && data &&
                (<div style={mainContainer}>
                    <div style={buttonContainer}>
                        <Button style={buttonStyle} variant="contained" onClick={() => setDay(day + 1)}>TOMORROW</Button>
                    </div>
                    <div style={dateText}>
                        <span>{timestampToDate(data.current.dt)}</span>
                    </div>
                    <div style={measurementsContainer}>
                        <div style={measurementContainer}>
                            <img style={iconSize} alt={`weather icon`} src={`http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`} />
                            <span style={measurementText}>{data.current.temp} &#8451;</span>
                        </div>
                        <div style={measurementContainer}>
                            <img style={iconSize} alt={`pressure icon`} src={pressureIcon} />
                            <span style={measurementText}>{data.current.pressure} hPa</span>
                        </div>
                        <div style={measurementContainer}>
                            <img style={iconSize} alt={`humidity icon`} src={humidityIcon} />
                            <span style={measurementText}>{data.current.humidity} %</span>
                        </div>
                        <div style={measurementContainer}>
                            <img style={iconSize} alt={`wind speed icon`} src={windIcon} />
                            <span style={measurementText}>{data.current.wind_speed} m/s</span>
                        </div>
                    </div>
                </div>
                )
            }
            {day !== 0 && data &&
                (<div style={mainContainer}>
                    <div style={buttonContainer}>
                        <ButtonGroup variant="contained">
                            <Button style={buttonStyle} onClick={() => setDay(day - 1)}>PREVIOUS</Button>
                            {day < data.daily.length - 1 ? <Button style={buttonStyle} onClick={() => setDay(day + 1)}>NEXT</Button> : null}
                        </ButtonGroup>
                    </div>
                    <div style={dateText}>
                        <span>{timestampToDate(data.daily[day].dt, 'short')}</span>
                    </div>
                    <div style={measurementsContainer}>
                        <div style={measurementContainer}>
                            <img style={iconSize} alt={`weather icon`} src={`http://openweathermap.org/img/w/${data.daily[day].weather[0].icon}.png`} />
                            <div>
                                <div style={measurementText}>morning: {data.daily[day].temp.morn} &#8451;</div>
                                <div style={measurementText}>day: {data.daily[day].temp.day} &#8451;</div>
                                <div style={measurementText}>evening: {data.daily[day].temp.eve} &#8451;</div>
                                <div style={measurementText}>night: {data.daily[day].temp.night} &#8451;</div>
                            </div>
                        </div>
                        <div style={measurementContainer}>
                            <img style={iconSize} alt={`pressure icon`} src={pressureIcon} />
                            <span style={measurementText}>{data.daily[day].pressure} hPa</span>
                        </div>
                        <div style={measurementContainer}>
                            <img style={iconSize} alt={`humidity icon`} src={humidityIcon} />
                            <span style={measurementText}>{data.daily[day].humidity} %</span>
                        </div>
                        <div style={measurementContainer}>
                            <img style={iconSize} alt={`wind speed icon`} src={windIcon} />
                            <span style={measurementText}>{data.daily[day].wind_speed} m/s</span>
                        </div>
                    </div>
                </div>
                )
            }
        </div>
    );
}

export default WeatherData