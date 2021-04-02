import styled from 'styled-components';

export const ContentWrapper = styled.section`
    padding: 16px;
    border-radius: 4px;
    background: var(--body);
    box-shadow: var(--box-shadow-cards);
    height: 550px;

    .drop-down-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .my-node-enter {
        opacity: 0;
    }
    .my-node-enter-active {
        opacity: 1;
        transition: opacity 200ms;
    }
    .my-node-exit {
        opacity: 1;
    }
    .my-node-exit-active {
        opacity: 0;
        transition: opacity 200ms;
    }
`;
