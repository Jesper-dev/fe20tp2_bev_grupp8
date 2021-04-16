import styled from 'styled-components';

const ContentWrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin-bottom: 3.5rem;
    margin-left: calc(
        100vw - 100%
    ); // https://css-tricks.com/elegant-fix-jumping-scrollbar-issue/
    min-height: calc(100vh - 3.5rem);

    @media screen and (min-width: 1024px) {
        margin-left: calc(100vw - 100% + 14rem);
        margin-bottom: 0;
        min-height: 100vh;
    }
`;

export default ContentWrapper;
