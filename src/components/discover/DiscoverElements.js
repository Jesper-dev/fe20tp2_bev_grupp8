import styled from 'styled-components';

export const ContentWrapper = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 1rem;
    margin-bottom: 3.5rem;
    background-color: var(--body-secondary);

    h1 {
        font-size: 1.75rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;

        @media screen and (max-width: 400px) {
            font-size: 1.3rem;
        }
    }

    h2 {
        text-align: center;
        margin: 0;
        margin-bottom: 0.75rem;
    }

    @media screen and (min-width: 1024px) {
        margin-left: 14rem;
    }
`;
