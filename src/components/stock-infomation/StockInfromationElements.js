import styled from 'styled-components';

export const ContentWrapper = styled.div`
    /* height: 100vh; */
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
        box-shadow: var(--box-shadow-cards);
        border-radius: 4px;
        padding: 8px;
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

    .followWrapper {
        display: flex;
        align-items: center;
        justify-content: center;

        color: var(--body-fourth);

        .fa-eye {
            padding-left: 4px;
        }
    }

    input[type='checkbox'] {
        height: 24px;
        width: 24px;
        outline: none;
        border-radius: 0.7rem;
    }

    input[type='checkbox']:checked {
        animation: checked 0.5s;
    }

    input[type='checkbox']:not(:checked) {
        animation: unChecked 0.5s;
    }

    @keyframes checked {
        0% {
            transform: scale(0.75);
        }
        50% {
            transform: scale(1.3);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes unChecked {
        0% {
            transform: scale(0.75);
        }
        50% {
            transform: scale(1.3);
        }
        100% {
            transform: scale(1);
        }
    }
`;
