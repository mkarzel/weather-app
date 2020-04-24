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

    const [temperature, setTemperature] = useState('')
    const [pressure, setPressure] = useState('')
    const [humidity, setHumidity] = useState('')
    const [data, setData] = useState('')
    useEffect(() => {
        (async () => {
            const response = await axios.get(url);
            setTemperature(response.data.current.temp)
            setPressure(response.data.current.pressure)
            setHumidity(response.data.current.humidity)
            // setData(response.data)
            // console.log(response)
        })();
    }, []);
    // console.log(response)
    // setData(response.data)
    console.log(data)
    return (
        <div style={container}>
            <div>temperature: {temperature} C</div>
            <div>pressure: {pressure} hPa</div>
            <div>humidity: {humidity} %</div>
        </div>
    );

}

export default WeatherData