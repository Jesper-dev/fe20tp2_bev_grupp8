import styled from 'styled-components';

export const ChatWrapper = styled.main`
    position: fixed;
    display: ${(props) => (props.showChat ? 'block' : 'none')};
    right: 8rem;
    bottom: 0rem;
    padding: 1rem;
    border-radius: 0.5rem 0.5rem 0 0;
    background: var(--body);
    box-shadow: 0 5px 10px rgba(154, 160, 185, 0.7),
        0 15px 40px rgba(166, 173, 201, 0.2);
    /* box-shadow: var(--box-shadow-cards); */
    /* border-top: 0.1px solid black; */
    height: 40vh;
    width: 20rem;

    @media screen and (max-width: 550px) {
        right: 5.5rem;
        bottom: 4rem;
        width: 60%;
        height: 70%;
    }

    form {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-top: 1rem;
        gap: 0.5rem;
        .fa-smile {
            font-size: 1.6rem;
        }
    }
    input {
        padding: 0.4rem;
        border: 1px solid lightgray;
        border-radius: 20px;
        width: 50%;
        outline: none;

        transition: all 200ms ease-in-out;

        &:focus {
            width: 100%;
            padding: 0.4rem;
        }

        @media screen and (max-width: 550px) {
            width: 80%;
        }
    }

    button {
        background: none;
        border: none;
        font-size: 1.2rem;
        color: var(--clr-primary);

        cursor: pointer;

        @media screen and (max-width: 550px) {
            font-size: 1.4rem;
        }
    }

    .chat-wrapper {
        position: relative;
        height: 80%;
        display: flex;
        flex-direction: column-reverse;
        overflow: auto;
        border-bottom: 1px solid lightgray;
        border-top: 1px solid lightgray;
    }

    .chat-wrapper > span {
        /* border: 1px solid black; */
        padding: 8px;
        width: 50%;
        margin: 4px;
        border-radius: 20px;
    }
`;

export const ChatIcon = styled.button`
    position: fixed;
    right: 2rem;
    bottom: 2rem;
    outline: none;

    font-size: 4rem;
    color: var(--clr-primary);
    background: none;
    border: none;
    cursor: pointer;
    opacity: ${(props) => (props.showChat ? '50%' : '100%')};

    transition: all 150ms ease-in-out;

    &:hover {
        color: var(--clr-primary__dimmer);
        font-size: 4.2rem;
    }

    @media screen and (max-width: 550px) {
        right: 1.5rem;
        bottom: 4rem;
        font-size: 3rem;

        &:hover {
            color: var(--clr-primary__dimmer);
            font-size: 3rem;
        }
    }
`;
