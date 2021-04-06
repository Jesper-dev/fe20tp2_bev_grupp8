import styled from 'styled-components';

export const ContentWrapper = styled.div`
    margin-bottom: 56px;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h1 {
        color: var(--body-fifth);
        text-align: center;
    }

    & > button {
        padding: 0.75rem 1rem;
        background: lightgrey;
        border: none;
        background: none;
        font-family: inherit;
        font-size: 0.875rem;
        cursor: pointer;
    }
`;
