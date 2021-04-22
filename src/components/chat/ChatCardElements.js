import styled from 'styled-components'

export const ChatCardWrapper = styled.div`
    /* border: 1px solid black; */
    display: flex;
    /* flex-direction: ${(props) => props.yourMsg ? 'row-reverse' : 'row'}; */
    flex-direction: row;
    align-items: center;
    justify-content: ${(props) => props.yourMsg ? 'flex-end' : 'flex-start'};;
    padding: 8px;
    width: 90%;


    img{
        width: 60px;
        border: 1px solid black;
        border-radius: 50px;
    }

    span {
        font-size: 1.2rem;
    }
`