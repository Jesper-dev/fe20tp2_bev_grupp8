import styled from 'styled-components';

export const ContentWrapper = styled.section`
    display: flex;
    flex-direction: column;
    gap: ${props => props.gap};
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

export const SectionWrapper = styled.section`
    display: flex;
    flex-direction: column;
    max-width: 40rem;
    width: 100%;
    gap: 0.5rem;
    text-align: center;
    h3 {
        margin: 0;
        text-align: center;
    }
`;
