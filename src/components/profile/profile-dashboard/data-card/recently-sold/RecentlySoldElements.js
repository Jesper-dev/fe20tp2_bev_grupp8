import styled from 'styled-components';

export const ContentWrapper = styled.article`
    padding: 1rem;
    border-radius: 0.25rem;
    background: var(--body);
    box-shadow: var(--box-shadow-cards);

    .info-wrapper {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
    }
`;
