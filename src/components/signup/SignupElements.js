import styled from 'styled-components';

export const ContentWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    background: var(--body-secondary);

    h1 {
        margin: 8px;
        color: var(--primary);
    }
    h3 {
        color: var(--body-fourth);
        margin: 0;
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
        height: 10%;
        border: 2px solid var(--body-third);
        /*         background: var(--body-second); */
        border-radius: 12px;
        margin: 16px;
        outline: none;
        padding-left: 8px;
        ::placeholder {
            padding-left: 8px;
        }
    }

    button {
        padding: 8px 72px;
        background: var(--primary);
        border-radius: 16px;
        color: var(--body);
        font-size: 1rem;
        outline: none;
        margin: 8px;
        cursor: pointer;
    }
`;
