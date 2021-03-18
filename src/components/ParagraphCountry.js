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
        country,
    } = props

    return <Option 
                id={index} 
                onClick={(e) => handleClick(e)} 
            >
                <Flag src={country.flag} width='25' alt="flag"/>{country.name}
            </Option>
}

export default ParagraphCountry