import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pressureIcon from '../images/atmospheric-pressure.png';
import humidityIcon from '../images/humidity.png';
import windIcon from '../images/wind-speed.png';
import { makeStyles } from '@material-ui/styles';
import { CircularProgress } from '@material-ui/core';
import weatherIcons from '../descriptions.json';

const useStyles = makeStyles({
    weatherContainer: {
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    current: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    current__measurements: {
        display: 'flex',
        justifyContent: 'space-evenly',
        paddingBottom: '2vw',
    },
    current__measurement: {
        display: 'flex',
        alignItems: 'center',
    },
    current__date: {
        color: 'yellow',
        textAlign: 'center',
        fontSize: '2vw',
        '@media screen and (max-width: 600px)': {
            fontSize: '3vh',
        },
    },
    current__text: {
        paddingLeft: '1vw',
        fontSize: '2vw',
        '@media screen and (max-width: 600px)': {
            fontSize: '2vh',
        },
    },
    current__icon: {
        width: '3vw',
        '@media screen and (max-width: 600px)': {
            width: '3vh',
        },
    },
    forecast: {
        display: 'flex',
        justifyContent: 'space-evenly',
        '@media screen and (max-width: 600px)': {
            flexDirection: 'column',
        },
    },
    forecast__week: {
        '@media screen and (max-width: 600px)': {
            display: 'flex',
            justifyContent: 'space-evenly',
        },
    },
    forecast__day: {
        display: 'flex',
        paddingBottom: '1vh',
        '@media screen and (max-width: 600px)': {
            justifyContent: 'center',
            width: '20vw',
        },
    },
    forecast__date: {
        display: 'flex',
        justifyContent: 'center',
        color: 'yellow',
        fontSize: '2vw',
        '@media screen and (max-width: 600px)': {
            fontSize: '1.5vh',
            width: '20vw',
        },
    },
    forecast__text: {
        paddingLeft: '0.5vw',
        fontSize: '1.5vw',
        '@media screen and (max-width: 600px)': {
            fontSize: '1.5vh',
        },
    },
    forecast__icon: {
        width: '2vw',
        '@media screen and (max-width: 600px)': {
            width: '2.5vh',
        },
    },
    info__text: {
        fontSize: '3vw',
        color: 'yellow',
        textAlign: 'center',
    },
    loader: {
        display: 'flex',
        justifyContent: 'center',
        height: '50vh',
        alignItems: 'center',
    },
});

const timestampToDate = (unixTimestamp, version) => {
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
    if (version === 'short') {
        return dateObject.toLocaleString('pl-PL', { day: 'numeric', month: 'numeric' });
    }
    else {
        return dateObject.toLocaleString('pl-PL');
    }
}

const WeatherData = (props) => {

    const classes = useStyles();

    let lat = props.coords[0].lat;
    let lng = props.coords[0].lng;

    if (lng > 180) {
        if (lng % 180 !== lng % 360) {
            lng = (lng % 180) - 180;
        }
        if (lng % 180 === lng % 360) {
            lng = lng % 180;
        }
    }
    if (lng < -180) {
        if (lng % 180 !== lng % 360) {
            lng = (lng % 180) + 180;
        }
        if (lng % 180 === lng % 360) {
            lng = lng % 180;
        }
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weather_code,temperature_2m_max,wind_speed_10m_max,relative_humidity_2m_mean,precipitation_sum,pressure_msl_mean&hourly=temperature_2m,precipitation_probability,weather_code,wind_speed_10m,relative_humidity_2m,pressure_msl&current=temperature_2m,wind_speed_10m,weather_code,pressure_msl,is_day&timezone=Europe%2FBerlin&timeformat=unixtime`

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            if (lat && lng > -180 && lng < 180) {
                try {
                    setData(null);
                    setLoading(true);
                    const response = await axios.get(url);
                    setLoading(false);
                    setData(response.data);
                } catch (e) {
                    setLoading(false);
                    console.error(e);
                }
            }
        })();
    }, [lat, lng, url]);

    const WeatherIcon = ({ code, timeOfDay }) => {
        const weatherInfo = weatherIcons[code]?.[timeOfDay];

        if (!weatherInfo) return <p>No weather data</p>;

        return (
            <div>
                <img
                    className="weather-icon"
                    src={weatherInfo.image}
                    alt={weatherInfo.description}
                />
            </div>
        );
    };

    const forecast = [];
    if (data) {
        for (let i = 1; i < data.daily.time.length; i++) {
            forecast.push(
                <div className={classes.forecast__week} key={i}>
                    <div className={classes.forecast__day}>
                        <WeatherIcon code={data.daily.weather_code[i]} timeOfDay='1' />
                        <span className={classes.forecast__text}>{data.daily.temperature_2m_max[i]}&#8451;</span>
                    </div>
                    <div className={classes.forecast__day}>
                        <img className={classes.forecast__icon} alt={`pressure icon`} src={pressureIcon} />
                        <span className={classes.forecast__text}>{data.daily.pressure_msl_mean[i]} hPa</span>
                    </div>
                    <div className={classes.forecast__day}>
                        <img className={classes.forecast__icon} alt={`humidity icon`} src={humidityIcon} />
                        <span className={classes.forecast__text}>{data.daily.precipitation_sum[i]} mm</span>
                    </div>
                    <div className={classes.forecast__day}>
                        <img className={classes.forecast__icon} alt={`wind speed icon`} src={windIcon} />
                        <span className={classes.forecast__text}>{data.daily.wind_speed_10m_max[i]} km/h</span>
                    </div>
                    <div>
                        <div className={classes.forecast__date}>{timestampToDate(data.daily.time[i], 'short')}</div>
                    </div>
                </div>)
        }
    }

    return (
        <div>
            {!data && !loading && (
                <div className={classes.info__text}>Mark a place on the map to check the weather</div>
            )}
            {loading && (
                <div className={classes.loader}><CircularProgress color={'inherit'} size={'10vh'} /></div>
            )}
            {data &&
                (<div className={classes.weatherContainer}>
                    <div className={classes.current}>
                        <div className={classes.current__date}>
                            <span>{timestampToDate(data.current.time)}</span>
                        </div>
                        <div className={classes.current__measurements}>
                            <div className={classes.current__measurement}>
                                <WeatherIcon code={data.current.weather_code} timeOfDay={data.current.is_day} />
                                <span className={classes.current__text}>{data.current.temperature_2m}&#8451;</span>
                            </div>
                            <div className={classes.current__measurement}>
                                <img className={classes.current__icon} alt={`wind speed icon`} src={windIcon} />
                                <span className={classes.current__text}>{data.current.wind_speed_10m} m/s</span>
                            </div>
                            <div className={classes.current__measurement}>
                                <img className={classes.current__icon} alt={`pressure icon`} src={pressureIcon} />
                                <span className={classes.current__text}>{data.current.pressure_msl} hPa</span>
                            </div>
                            {/* <div className={classes.current__measurement}>
                                <img className={classes.current__icon} alt={`humidity icon`} src={humidityIcon} />
                                <span className={classes.current__text}>{data.current.relative_humidity_2m}%</span>
                            </div> */}
                        </div>
                    </div>
                    <div className={classes.forecast}>
                        {forecast}
                    </div>
                </div>)
            }
        </div>
    );
}

export default WeatherData;