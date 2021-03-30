import styled from 'styled-components';

export const ContentWrapper = styled.main`
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 90vh;

    .buttonWrapper {
        border: 1px solid black;
        height: 10%;
        display: flex;
        justify-content: space-around;
    }

    .buttonWrapper > button {
        width: 25%;
    }

    .amountWrapper {
        margin-bottom: 32px;
    }

    .amountWrapper > input {
        width: 15%;
        height: 50%;
        margin: 8px;
    }
`;
