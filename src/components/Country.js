import React,{useState,useEffect} from 'react'
import BeatLoader from "react-spinners/BeatLoader";
import Weather from './Weather'
import axios from 'axios'
import styled from 'styled-components'

const CountryContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-self: center;
    margin: 1rem;
    paggin: 1rem;
`
const Flag = styled.img`
    max-width:50%,
    display:block;
    height: auto
    align-self: center;
`

const FlagContainer = styled.div`
    grid-column-start: 1;
    grid-column-end: 1;
    grid-row-start: 1;
    grid-row-end: 2;
    @media (max-width: 500px) {
        grid-column-start: 1;
        grid-column-end: 3;
    }
    display: flex;
    flex-direction: columns;
    justify-content:center;
    margin-bottom: 1rem;
`

const Info = styled.div`
    grid-column-start: 2;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;  
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    @media (max-width: 500px) {
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 2;
        grid-row-end: 3; 
    }
`

const WeatherContainer = styled.div`
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 2; 
    @media (max-width: 500px) {
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 3;
        grid-row-end: 4; 
    }
`

const ParagraphLanguage = ({language}) => {
  return <dt>{language.name}</dt>
}

const Country = ({country}) =>{
    
    const api_key_weather = process.env.REACT_APP_API_KEY
    const[weather,setWeather] = useState([])

    const hook = () => {
        if(country && country.capital){
            axios.get(`https://cors-proxy-casz.herokuapp.com/http://api.weatherstack.com/current?access_key=${api_key_weather}&query=${country.capital}`)
            .then(response => {
                if(response.data.sucess !== false){
                    setWeather(response.data)
                }
            })
        }
    }
    
    useEffect(hook,[api_key_weather,country])  

    const languages = country?country.languages.map((language,index)=>{
        return <ParagraphLanguage key={index} language={language}/>
    }):[]

    if(!country){
        return <BeatLoader size={25}/>
    }

    return(
        <React.Fragment>
            <h2>{country.name}</h2>
            <CountryContainer>
                <FlagContainer>
                    <Flag src={country.flag} width='170' alt="flag"/>
                </FlagContainer>
                <Info>
                    <div><b>Capital</b> {country.capital}<br/></div>
                    <div><b>Population</b> {country.population}<br/><br/></div>
                    <div style={{alignSelf:'center'}}>
                        <b>Languages</b><br/>
                        <dl>{languages}</dl>
                    </div>
                </Info>
                <WeatherContainer>
                    <h3>Weather in {country.capital}</h3>
                    <Weather weather={weather}/>
                </WeatherContainer>
            </CountryContainer>
        </React.Fragment>
    )
}

export default Country