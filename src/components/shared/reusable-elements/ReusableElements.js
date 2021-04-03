import styled from 'styled-components';

export const ReusabelInputField = styled.input`
    width: 100%;
    padding: 0.5rem 0.375rem 0.5rem 0;
    border: 0.09375rem solid #c8c8c8;
    border-radius: 0.25rem;
    outline: none;
    background: none;
    color: #383838;
    font-family: inherit;
    font-size: 0.8125rem;
    font-weight: 500;
    text-indent: 0.375rem;
    transition: border-color 125ms linear, box-shadow 125ms linear;
    &:hover {
        border-color: var(--third);
    }

    &:focus {
        border-color: var(--third);
        box-shadow: 0 0 0 0.1875rem #ddeafd;
    }

    &:invalid {
        border-color: #e68e8e;
        box-shadow: 0 0 0 0.1875rem #fddddd;
    }

    &:invalid:not(:focus) {
        border-color: #e68e8e;
        box-shadow: none;
    }
`;
