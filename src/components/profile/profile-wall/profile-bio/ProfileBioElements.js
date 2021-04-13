import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: auto;
    width: 100%;
    max-width: 40rem;

    & > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    textarea {
        padding: 0.5rem;
        border: 0.1rem solid #ddd;
        border-radius: 0.25rem;
        outline: none;
        background: none;
        font-family:inherit;
        resize: none;
        transition: border-color 125ms linear, box-shadow 125ms linear;

        &::placeholder {
            color: grey;
            opacity: 1;
        }

        &:focus {
            border-color: var(--clr-primary__brighter);
            box-shadow: 0 0 0 0.1875rem var(--clr-primary-light__dimmer);
        }
    }

    h2 {
        margin: 0;
    }
    }

    & > p {
        max-height: 8rem;
        overflow-y: auto;
    }

    button {
        width: 20%;

        @media screen and (min-width: 1024px) {
            width: 10%;
            background: none;
            border-radius: 5px;
        }
    }

    button:hover {
        color: black;
    }
`;
