import styled from 'styled-components'


export const BackButtonElement = styled.button`
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    border: none !important;
    padding: 0.75rem;
    background: none;
    color: var(--body-fifht);
    font-size: 1.5rem;
    cursor: pointer;
    transition: transform 125ms linear, background-color 125ms linear;
    border-radius: 50%;
    transform: scale(1);

    &:hover {
        background-color: #e8e8e8;
    }

    @media screen and (min-width: 1000px) {
        transform: scale(0);
    }

`