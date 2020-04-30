import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pressureIcon from '../images/atmospheric-pressure.png'
import humidityIcon from '../images/humidity.png'
import windIcon from '../images/wind-speed.png'

const mainContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '50vh',
}

const currentDateText = {
    color: 'yellow',
    textAlign: 'center',
    fontSize: '2vw',
}

const currentMeasurementsContainer = {
    display: 'flex',
    justifyContent: 'space-evenly',
}

const currentMeasurementContainer = {
    display: 'flex',
    alignItems: 'center',
}

const measurementText = {
    paddingLeft: '1vw',
    fontSize: '2vw',
}

const forecastText = {
    paddingLeft: '0.5vw',
    fontSize: '1.5vw',
}

const forecastDateText = {
    color: 'yellow',
    fontSize: '2vw',
    textAlign: 'center'
}

const forecastContainer = {
    display: 'flex',
    justifyContent: 'space-evenly',
}

const currentIconSize = {
    width: '3vw'
}

const forecastIconSize = {
    width: '2vw'
}

const forecastDay = {
    display: 'flex',
    paddingBottom: '1vh'
}

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
                <div key={i}>
                    <div style={forecastDay}>
                        <img style={forecastIconSize} alt={`weather icon`} src={`http://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`} />
                        <div style={forecastText}>{data.daily[i].temp.day} &#8451;</div>
                    </div>
                    <div style={forecastDay}>
                        <img style={forecastIconSize} alt={`pressure icon`} src={pressureIcon} />
                        <span style={forecastText}>{data.daily[i].pressure} hPa</span>
                    </div>
                    <div style={forecastDay}>
                        <img style={forecastIconSize} alt={`humidity icon`} src={humidityIcon} />
                        <span style={forecastText}>{data.daily[i].humidity} %</span>
                    </div>
                    <div style={forecastDay}>
                        <img style={forecastIconSize} alt={`wind speed icon`} src={windIcon} />
                        <span style={forecastText}>{data.daily[i].wind_speed} m/s</span>
                    </div>
                    <div>
                        <div style={forecastDateText}>{timestampToDate(data.daily[i].dt, 'short')}</div>
                    </div>
                </div>)
        }
    }

    return (
        <div>
            {data &&
                (<div style={mainContainer}>
                    <div style={currentDateText}>
                        <span>{timestampToDate(data.current.dt)}</span>
                    </div>
                    <div style={currentMeasurementsContainer}>
                        <div style={currentMeasurementContainer}>
                            <img style={currentIconSize} alt={`weather icon`} src={`http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`} />
                            <span style={measurementText}>{data.current.temp} &#8451;</span>
                        </div>
                        <div style={currentMeasurementContainer}>
                            <img style={currentIconSize} alt={`pressure icon`} src={pressureIcon} />
                            <span style={measurementText}>{data.current.pressure} hPa</span>
                        </div>
                        <div style={currentMeasurementContainer}>
                            <img style={currentIconSize} alt={`humidity icon`} src={humidityIcon} />
                            <span style={measurementText}>{data.current.humidity} %</span>
                        </div>
                        <div style={currentMeasurementContainer}>
                            <img style={currentIconSize} alt={`wind speed icon`} src={windIcon} />
                            <span style={measurementText}>{data.current.wind_speed} m/s</span>
                        </div>
                    </div>
                    <div style={forecastContainer}>
                        {forecast}
                    </div>
                </div>
                )
            }
        </div>
    );
}

export default WeatherData