import styled from 'styled-components';

export const ContentWrapper = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 40rem;
            text-align: center;

    h3 {
        margin: 0;
        text-align: center;
    }

    & > p {
        padding: 0.5rem 2rem;
        text-align: center;
    }
`;
