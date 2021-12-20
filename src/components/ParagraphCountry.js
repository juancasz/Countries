import React from 'react'
import styled,{css} from 'styled-components'

const Flag = styled.img`
    width:100%,
    height: auto
`
const Option = styled.div`
    background-color: ${props => props.id === props.indexHover? "#ff6600":"black"};
    
    ${props => !props.usingKeyboard && css`
        &:hover {
            background-color:#ff6600 ;
        }
    `}

    &:hover {
        cursor: pointer;
    }
`

const ParagraphCountry = (props) => {
    const{
        index,
        indexHover,
        usingKeyboard,
        handleClick,
        handleMouseEnter,
        handleMouseLeave,
        country,
    } = props

    return <Option 
                id={index} 
                indexHover = {indexHover}
                usingKeyboard = {usingKeyboard}
                onClick={handleClick} 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Flag src={country.flags.png} id={index} width='25' alt="flag"/>{country.name.common}
            </Option>
}

export default ParagraphCountry