import styled from 'styled-components';

export const ContentWrapper = styled.div`
    form {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    textarea {
        padding: 0.75rem;
        border: 0.1875rem solid lightgrey;
        outline: none;
        background-color: var(body-secondary);
        font: inherit;
        resize: none;
        height: 1.5rem;
        transition: height 250ms ease-in-out;

        &::placeholder {
            color: var(--primary);
            opacity: 1;
        }
    }

    textarea:focus {
        height: 12rem;

        button {
            //display: flex;
            margin-left: auto;
            //justify-content: flex-end;
            padding: 12px;
            background-color: var(--primary);
            border: none;
            border-radius: 5px;
            margin: 8px;
        }
    }

    button {
        padding: 0.75rem;
        border: none;
        border-radius: 0.25rem;
        margin: 0;
        background-color: var(--primary);
        color: white;
        font-family: inherit;
        font-size: 1rem;
        font-weight: 500;
    }
`;
