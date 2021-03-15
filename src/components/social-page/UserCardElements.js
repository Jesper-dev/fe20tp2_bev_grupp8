import styled from 'styled-components'


export const UserWrapper = styled.div`
    height: 10%;
    border: 1px solid black;
    margin: 8px;
    display: flex;
    flex-flow: nowrap row;
    justify-content: space-around;
    align-items: center;

    span {
        font-size: 1.2rem;
    }

    img {
        width: 50px;
        height: 50px;
    }
`