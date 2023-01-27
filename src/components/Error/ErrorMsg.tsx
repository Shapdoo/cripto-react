interface ErrorProps{
    children: string
}

import styled from "@emotion/styled"

const Message = styled.div`
    background-color: #B7322C;
    color: #FFF;
    padding: 15px;
    font-size: 22px;
    text-transform: uppercase;
    font-family: 'Lato', sans-serif;
    font-weight: bold;
    text-align: center;
`

const ErrorMsg = ({ children }: ErrorProps) => {
    return(
        <Message>
            { children }
        </Message>
    )
}

export default ErrorMsg