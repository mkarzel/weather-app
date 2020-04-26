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

    const [data, setData] = useState(null)

    useEffect(() => {
        (async () => {
            const response = await axios.get(url);
            setData(response.data)
        })();
    }, []);
    console.log(data)
    return (
        <div style={container}>
            {data && (<div>
                <div>temperature: {data.current.temp} C</div>
                <div>pressure: {data.current.pressure} hPa</div>
                <div>humidity: {data.current.humidity} %</div>
                <div>description: {data.current.weather[0].main}</div>
            </div>
            )}
        </div>
    );

}

export default WeatherData