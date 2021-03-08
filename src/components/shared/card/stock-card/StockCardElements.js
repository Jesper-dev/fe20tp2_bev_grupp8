import styled from 'styled-components';

export const CardWrapper = styled.div`
    border: 2px solid var(--primary);
    border-radius: 5px;
    background: var(--body);
    width: 90vw;
    min-height: 38px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    span {
        font-size: 1rem;
        font-weight: bold;
    }

    button {
        background: none;
        border: 1px solid black;
        padding: 8px;
        outline: none;
    }
`;
