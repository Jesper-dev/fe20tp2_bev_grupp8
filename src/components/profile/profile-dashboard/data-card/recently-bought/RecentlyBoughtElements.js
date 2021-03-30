import styled from 'styled-components';

export const ContentWrapper = styled.div`
    text-align: center;
    margin: 56px 0 56px 0;
    padding: 24px;
    border-radius: 0.5rem;
    background: var(--body);
    box-shadow: var(--box-shadow-cards);

    .info-wrapper {
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
    }
`;
