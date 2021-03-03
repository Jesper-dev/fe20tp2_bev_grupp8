import styled from 'styled-components';

export const CardWrapper = styled.div`
    border: 2px solid black;
    width: 90%;
    height: 8%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    span {
        font-size: 0.8rem;
    }

    button {
        background: none;
        border: 1px solid black;
        padding: 8px;
        outline: none;
    }
`;
