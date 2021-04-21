import styled, { css } from 'styled-components';

import { Link } from 'react-router-dom';

export const Button = styled(Link)`
    display: inline-block;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
    border: 0.125rem solid transparent;
    outline: none;
    cursor: pointer;
    text-decoration: none;
    font-weight: 500;
    white-space: nowrap;

    &:focus {
        box-shadow: 0 0 0 0.1875rem var(--third);
    }

    ${(props) =>
        props.primary &&
        css`
            background-color: var(--primary);
            color: white;
        `}

    ${(props) =>
        props.secondary &&
        css`
            background-color: none;
            color: var(--primary);
            border-color: var(--primary);
            transition: background-color 125ms linear, color 125ms linear;

            &:hover {
                background-color: var(--primary);
                color: white;
            }
        `}
`;

export const ButtonPrimary = styled(Link)`
    display: inline-block;
    background-color: ${(props) => props.bg};
    color: var(--body);
    border-radius: 16px;
    padding: 0.5rem 1.25rem;
    border: none;
    outline: none;
    cursor: pointer;
    text-decoration: none;
    font-weight: 400;
    white-space: nowrap;

    &:focus {
        box-shadow: 0 0 0 0.1875rem var(--clr-primary__dimmer);
    }
`;

export const GenericVestBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${(props) => props.pad};
    border: ${(props) => props.border};
    border-radius: ${(props) => props.br};
    background-color: ${(props) => props.bg};
    color: ${(props) => props.co};
    width: ${(props) => props.wid};
    height: ${(props) => props.hei};
    font-size: ${(props) => props.fz};
    font-family: inherit;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 100ms linear, color 100ms linear;
    outline: none;
    min-width: min-content;

    &:hover {
        background-color: ${(props) => props.hovbg};
        color: ${(props) => props.hovco} !important;
        border: ${(props) => props.hovbor};
    }

    @media screen and (max-width: 500px) {
        width: 40%;
        padding: 4px;
    }

    @media screen and (max-width: 1500px) {
        width: 20%;
        padding: 4px;
    }
`;
