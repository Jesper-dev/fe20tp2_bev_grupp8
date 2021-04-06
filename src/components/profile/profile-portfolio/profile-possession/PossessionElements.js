import styled from 'styled-components';

export const ContentWrapper = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin: auto;
    width: 100%;
    max-width: 40rem;
    max-height: 60vh;

    div{
 overflow: auto;
    }

/*     @media screen and (min-width: 768px){
        overflow: none;
        overflow-y: hidden;
        max-height: 80vh;
} */
    h1 {
        margin: 2rem 0 0 0;
    }
`;
