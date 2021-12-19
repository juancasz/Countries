import React,{useState, useEffect} from 'react';
import axios from 'axios'
import Display from './components/Display'
import BeatLoader from "react-spinners/BeatLoader";
import styled from 'styled-components'
import background from './images/map.jpg'

const Background = styled.div`
  background: url(${background});
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`

const Card =  styled.div`
  align-self: center;
  background-color: #b3b3b3;
  opacity: 0.9;
  width: 50vw;
  min-height: 5vh;
  padding: 1rem;
  margin: 2rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
`
const Input = styled.input`
  width: 25vw;
  align-self: center;
  height: 5vh;
  border-radius: 0.2rem;
`

const App = () => {
  const[countries,setCountries] = useState([])
  const[searchFor,setSearchFor] = useState("") 
  const[show,setShow]= useState(false)
  const[indexShow,setindexShow] = useState(0)

  const hook = () => {
    axios.get(process.env.REACT_APP_COUNTRIES_API)
        .then(response => {
          setCountries(response.data)
        })
  }

  useEffect(hook,[])

  const handleInput = (event) => {
    setSearchFor(event.target.value.toLowerCase())
    setShow(false)  
  }

  const handleClick = (event) => {
    setindexShow(event.target.id)
    setShow(!show)
  }

  const countriesToDisplay = countries.filter((country) => country.name.toLowerCase().indexOf(searchFor)>-1 && searchFor !== "")

  if(countries.length === 0){
    return(
      <Background>
        <Card>
          <BeatLoader size={50} />
        </Card>
      </Background>
    )
  }

  return(
    <Background>
      <Card>
        <h1>Search Countries</h1>
        <Input 
          onChange={handleInput} 
          placeholder="Write the name of the country"
        />
        <Display 
          countries={countriesToDisplay} 
          indexShow={indexShow} 
          handleClick={(event) => handleClick(event)} 
          show={show} 
          searchFor={searchFor}
        />
      </Card>
    </Background>
  )
}

export default App;
