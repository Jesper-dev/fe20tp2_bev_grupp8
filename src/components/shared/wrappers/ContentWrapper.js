import styled from 'styled-components';

const ContentWrapper = styled.div`
    padding: 1rem;
    margin-bottom: 3.5rem;
    margin-left: calc(100vw - 100%); // https://css-tricks.com/elegant-fix-jumping-scrollbar-issue/

    @media screen and (min-width: 1024px) {
        margin-left: 14rem;
    }
`;

export default ContentWrapper;