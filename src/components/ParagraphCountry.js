import React from 'react'
import styled from 'styled-components'

const Flag = styled.img`
    width:100%,
    height: auto
`
const Option = styled.div`
    &:hover{
        background-color: #ff6600;
        cursor: pointer;
    }
`

const ParagraphCountry = (props) => {
    const{
        index,
        handleClick,
        handleMouseEnter,
        handleMouseLeave,
        country,
    } = props

    return <Option 
                id={index} 
                onClick={handleClick} 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Flag src={country.flags.png} id={index} width='25' alt="flag"/>{country.name.common}
            </Option>
}

export default ParagraphCountry