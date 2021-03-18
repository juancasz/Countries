import React from 'react'
import BeatLoader from "react-spinners/BeatLoader";

const Weather = ({weather}) =>{
    
    if(weather.current === undefined){
        return <BeatLoader size={25}/>
    }
    return(
        <div>
            <b>Temperature:</b> {weather.current.temperature}°C<br/>
            <img src={weather.current.weather_icons[0]} style={{margin:'1rem'}} width="100" alt="flag"/><br/>
            <b>Wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}
        </div>
    )
}

export default Weather