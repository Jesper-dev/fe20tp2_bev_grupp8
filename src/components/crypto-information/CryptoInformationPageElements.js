import styled from 'styled-components';

export const ContentWrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    background-color: var(--body);
    margin-bottom: 56px;

    h1 {
        text-align: center;
        margin: 8px;
    }

    p {
        border: 2px solid var(--primary);
        border-radius: 4px;
        padding: 16px;
        margin: 8px;
        font-size: 1.1rem;
        display: flex;
        align-items: center;
    }

    button {
        padding: 0.75rem 1rem;
        background: none;
        border: 2px solid black;
        outline: none;
        border-radius: 0.25rem;
        cursor: pointer;
        font-family: inherit;
    }

    button:focus {
        box-shadow: var(--box-shadow-focus);
    }

    button:not(:focus-visible) {
        box-shadow: none;
    }

    .buttonWrapper {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }

    .buttonWrapper > input {
        width: 20%;
    }

    .imgWrapper {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    img {
        width: 150px;
        height: 150px;
        align-self: center;
    }
`;
