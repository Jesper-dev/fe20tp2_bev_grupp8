import styled from 'styled-components';

export const CryptoListElement = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin: 0 auto;
    width: 100%;
    max-width: 40rem;


    h1 {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 1.75rem;
        margin: 1.5rem 0 0 0;
        transition: font-size 250ms linear;

        @media screen and (max-width: 480px) {
            font-size: 1.25rem;
        }
    }
`;
