import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pressureIcon from '../images/atmospheric-pressure.png'
import humidityIcon from '../images/humidity.png'
import windIcon from '../images/wind-speed.png'

const mainContainer = {
    display: 'flex',
    justifyContent: 'space-evenly',
    padding: '2vw',
}

const measurementContainer = {
    display: 'flex',
    alignItems: 'center',
}

const measurementText = {
    paddingLeft: '1vw',
    fontSize: '2vw',
}

const iconSize = {
    width: '4vw'
}

const key = `4c5fbd2fe1afe8b0cd155b79c2de7ef8`
let lat = 53.4327
let lng = 14.5481
const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${key}`

const WeatherData = () => {

    const [data, setData] = useState(null)

    useEffect(() => {
        (async () => {
            const response = await axios.get(url);
            setData(response.data)
        })();
    }, []);
    console.log(data)
    return (
        <div>
            {data && (<div style={mainContainer}>
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
            )}
        </div>
    );

}

export default WeatherData