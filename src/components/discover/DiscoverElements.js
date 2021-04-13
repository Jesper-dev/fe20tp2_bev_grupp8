import styled from 'styled-components';

const HeaderWrapper = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
`;

const MainWrapper = styled.main`
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    h3 {
        margin-top: 1.5rem;
    }

    @media screen and (min-width: 1064px) {
        flex-direction: row;
        justify-content: space-evenly;
        align-items: flex-start;
    }
    /*  @media screen and (max-width: 768px) {
        align-items: center;
    } */
`;

export { HeaderWrapper, MainWrapper };
