import styled from 'styled-components'

export const SignOutBtnElement = styled.button`
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 0.25rem;
    background: none;
    color: var(--clr-primary);
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 125ms linear;

    &:hover {
        background-color: #e8e8e8;
    }
`