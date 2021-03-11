import styled from 'styled-components';

export const ContentWrapper = styled.div`
    margin-bottom: 56px;
    h1 {
        color: var(--body-fifth);
        text-align: center;
    }

    .customizeWrapper {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        padding: 8px;
    }

    .customizeWrapper > div {
        margin: 8px;
    }
`;
