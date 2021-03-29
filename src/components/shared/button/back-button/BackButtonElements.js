import styled from 'styled-components'


export const BackButtonElement = styled.button`
    position: absolute;
    top: 8px;
    left: 8px;

    border: none !important;
    background: none;
    color: var(--body-fifht);
    font-size: 1.6rem;
    cursor: pointer;
    transition: transform 125ms linear;

    @media screen and (min-width: 768px) {
        display: none;
        //transform: scale(0);
    }

`