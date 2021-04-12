import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin: auto;
    width: 100%;
    max-width: 40rem;
    max-height: 60vh;
    overflow: auto;
    padding-bottom: 1rem;

    h1 {
        margin: 2rem 0 0 0;
    }

    & > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    textarea {
        font-family: var(--typefaces);
        width: 100%;
        border-radius: 4px;
        resize: none;
        border: 2px solid #cccfc9;
        /*     border: none; */
        outline: none;
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

    .editable {
        border: 1px solid var(--clr-primary__brighter);
    }
`;
