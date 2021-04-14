import styled from 'styled-components';

export const ContentWrapper = styled.div`
    width: 100%;
    max-width: 40rem;

    form {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin: 1rem 0 0 0;
    }

    textarea {
        padding: 0.75rem;
        border: 0.1rem solid #ddd;
        border-radius: 0.25rem;
        outline: none;
        background: none;
        font: inherit;
        resize: none;
        height: 4rem;
        transition: height 250ms ease-in-out;

        &::placeholder {
            color: grey;
            opacity: 1;
        }

        &:focus,
        &.not-empty {
            height: 12rem;
            border-color: var(--clr-primary__brighter);
            box-shadow: 0 0 0 0.1875rem var(--clr-primary-light__dimmer);
        }
    }

    button {
        padding: 0.75rem;
        border: none;
        border-radius: 0.25rem;
        margin: 0;
        background-color: var(--clr-primary);
        color: white;
        font-family: inherit;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 125ms linear;

        &:hover,
        &:active {
            background-color: var(--clr-primary__brighter);
        }
    }

    div {
        display: flex;
        align-items: center;
    }

    .toast {
        position: absolute;
        right: 0;
        left: 0;
        bottom: 5rem;
        border-radius: 0.25rem;
        box-shadow: var(--box-shadow-cards);
        margin: auto;
        width: 15rem;
        height: 2.75rem;
        line-height: 2.75rem;
        background-color: var(--clr-primary);
        color: var(--clr-almost-white);
        font-weight: 500;
        text-align: center;
        transition: transform 150ms linear;
    }

    label {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: end;
        gap: 0.375rem;
        margin: 1rem 0;
        font-size: 0.925rem;
        user-select: none;

        .checkbox {
            position: absolute;
            appearance: none;
            margin: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
        }

        .checkbox:checked ~ svg > rect {
            fill: var(--clr-primary);
        }

        .checkbox:checked ~ svg > path {
            stroke-dashoffset: 0;
        }

        svg {
            width: 1.75rem;
            height: 1.75rem;

            rect {
                fill: transparent;
                stroke: var(--clr-primary);
                transition: fill 75ms linear;
            }

            path {
                stroke: var(--clr-almost-white);
                stroke-dasharray: 20;
                stroke-dashoffset: 20;
                transition: stroke-dashoffset 150ms linear;
            }
        }
    }
`;
