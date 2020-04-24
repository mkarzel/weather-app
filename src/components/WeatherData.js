import React, { useState, useEffect } from 'react';
import axios from 'axios';

const container = {
    display: 'flex',
    justifyContent: 'space-evenly'
}

const key = '4c5fbd2fe1afe8b0cd155b79c2de7ef8'
let lat = 53.4327
let lng = 14.5481
const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${key}`

const WeatherData = () => {

    const [current, setCurrent] = useState('')
    const [forecast, setForecast] = useState('')
    useEffect(() => {
        (async () => {
            const response = await axios.get(url);
            setCurrent(response.data.current)
            setForecast(response.data.daily)
        })();
    }, []);
    // console.log(forecast)
    return (
        <div style={container}>
            <div>temperature: {current.temp} C</div>
            <div>pressure: {forecast.pressure} hPa</div>
            <div>humidity: {current.humidity} %</div>
        </div>
    ); 

}

export default WeatherData