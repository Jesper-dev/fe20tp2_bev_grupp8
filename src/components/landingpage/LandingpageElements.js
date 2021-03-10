import styled from 'styled-components';

export const ContentWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    h2 {
        margin: 0;
        color: var(--primary);
    }

    > p {
        font-weight: bold;
        text-align: center;
    }

    div {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .money-svg {
        width: auto;
        height: 30%;
    }
`;
