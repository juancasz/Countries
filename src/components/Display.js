import React from 'react'
import ParagraphCountry from './ParagraphCountry'
import Country from './Country'
import styled from 'styled-components'

const Options = styled.div`
  background-color: black;
  color: white;
  width: 25.5vw;
  align-self: center;
  opacity: 1;
  z-index: 1;
`

const Display = (props) => {
  if(props.countries.length>10){
    return <>Too many matches, specify another filter </>
  }else if(props.countries.length>1){
    const list = props.show?
                  <Country country={props.countries[props.indexShow]} />:
                  <Options onKeyUp={props.handleKeyUp} onKeyDown={props.handleKeyDown}>
                    {props.countries.map((country,index) => {
                        return <ParagraphCountry 
                                  key={index} 
                                  index={index} 
                                  country={country} 
                                  handleClick={props.handleClick}
                                  handleMouseEnter={props.handleMouseEnter}
                                  handleMouseLeave={props.handleMouseLeave}
                                />
                    })}
                  </Options>
    return <>{list}</>
  }else if(props.countries.length === 1){
    return <Country country={props.countries[0]} />
  }else if(props.searchFor !== ""){
    return <>No Results</>
  }
  return <div></div>
}

export default Display