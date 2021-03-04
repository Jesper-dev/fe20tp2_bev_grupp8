import styled from "styled-components"

export const ContentWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    background-color: var(--body);
    color: var(--primary);

    h1 {
        margin: 8px;
    }

    form > h1 {
        margin: 16px;
    }

    form {
        display: flex;
        flex-flow: column nowrap;
        margin-top: 16px;
        height: 70%;
        width: 90%;
        align-items: center;
    }

    form > div {
        height: 50%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    
    }

    label {
        font-size: 1.5rem;
        margin: 8px;
    }

    input {
        font-size: 1rem;
        width: 100%;
        height: 20%;
        border: 2px solid var(--primary);
        border-radius: 10px;
        margin: 16px;
        outline: none;
        background: none;
    }

    button {
        padding: 16px 24px;
        border: 2px solid var(--primary);
        background: none;
        border-radius: 10px;
        color: var(--primary);
        font-size: 1rem;
        outline: none;
        margin: 8px;
        
    }
`