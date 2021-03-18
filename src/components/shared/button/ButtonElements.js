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
        box-shadow: 0 0 0 0.1875rem var(--third);
    }
`;

export const ShowCryptoBtn = styled.button`
    padding: 0.75rem 2rem;
    border: 0.125rem solid var(--primary);
    border-radius: 0.25rem;
    margin: auto;
    background: none;
    color: var(--primary-dark);
    font-family: inherit;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 100ms linear, color 100ms linear;

    &:hover {
        background-color: var(--primary);
        color: var(--body);
    }
`;
