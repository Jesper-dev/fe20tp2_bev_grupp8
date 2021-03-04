import styled from 'styled-components';

export const CardWrapper = styled.div`
    border: 2px solid black;
    width: 90vw;
    height: 6vh;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    span {
        font-size: 1.0rem;
        font-weight: bold;
    }

    button {
        background: none;
        border: 1px solid black;
        padding: 8px;
        outline: none;
    }
`;
