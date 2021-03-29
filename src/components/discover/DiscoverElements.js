import styled from 'styled-components';

export const ContentWrapper = styled.div`
    padding: 1rem;
    margin-bottom: 3.5rem;
    margin-left: calc(100vw - 100%); // https://css-tricks.com/elegant-fix-jumping-scrollbar-issue/

    @media screen and (min-width: 1024px) {
        margin-left: 14rem;
    }
`;

export const HeaderWrapper = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
`;

export const MainWrapper = styled.main`
    display: flex;
    flex-direction: column;
`;
