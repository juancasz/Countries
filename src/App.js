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
  &:focus {
    outline: none;
  }
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
  const[usingKeyboard,setUsingKeyboard] = useState(false)
  const[indexShow,setIndexShow] = useState(0)
  const[indexHover,setIndexHover] = useState(-1)

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
    setIndexHover(-1)  
  }

  const handleClick = (event) => {
    setIndexShow(event.target.id)
    setShow(!show)
    setIndexHover(-1)
    setUsingKeyboard(false)
  }

  const handleMouseEnter = (event) => {
    setIndexHover(Number(event.target.id))
    setUsingKeyboard(false)
  }

  const handleMouseLeave = () => {
    setIndexHover(-1)
  }

  const handleKeyPress = (event) => {
    switch (event.keyCode){
      case 38:
        if (!show && countriesToDisplay.length>0){
          setUsingKeyboard(true)
          if(indexHover < 1){
            setIndexHover(countriesToDisplay.length-1)
          }else if(indexHover>=1){
            setIndexHover(indexHover-1)
          }     
        }
        break
      case 40:
        if (!show && countriesToDisplay.length>0){
          setUsingKeyboard(true)
          if(indexHover < 0 || indexHover === countriesToDisplay.length-1){
            setIndexHover(0)
          }else if(indexHover>=0){
            setIndexHover(indexHover+1)
          }     
        }
        break
      case 13:
        if ((!show && countriesToDisplay.length>0) && indexHover>=0){
          setIndexShow(indexHover)
          setShow(!show)
          setIndexHover(-1)
          setUsingKeyboard(false)
        }
        break
      default:
        break
    }
  }

  const countriesToDisplay = countries.filter((country) => country.name.common.toLowerCase().indexOf(searchFor)>-1 && searchFor !== "")

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
    <Background
      onKeyDown={handleKeyPress}
      tabIndex={-1}
    >
      <Card>
        <h1>Search Countries</h1>
        <Input 
          onChange={handleInput} 
          placeholder="Write the name of the country"
        />
        <Display 
          countries={countriesToDisplay} 
          indexShow={indexShow}
          indexHover = {indexHover} 
          handleClick={(event) => handleClick(event)} 
          handleMouseEnter={(event) => handleMouseEnter(event)}
          handleMouseLeave={() => handleMouseLeave()}
          show={show} 
          searchFor={searchFor}
          usingKeyboard={usingKeyboard}
        />
      </Card>
    </Background>
  )
}

export default App;
