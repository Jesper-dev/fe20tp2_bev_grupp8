import styled from 'styled-components';

export const CardWrapper = styled.article`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0.5rem 0.75rem;
    border-radius: 0.25rem;
    box-shadow: var(--box-shadow-cards);
    width: 100%;
    min-height: 3rem;
    /* max-height: 48px; */
    background: var(--body);

    & > span {
        flex: 1;
        font-size: 1rem;
        font-weight: 600;
        text-align: center;
        white-space: nowrap;
    }

    a {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.25rem;
        border-radius: 50%;
        outline: none;
        width: 2rem;
        height: 2rem;
        line-height: 0;
        text-decoration: none;
        user-select: none;
        transition: background-color 125ms linear;

        &:hover {
            background-color: rgb(232, 232, 232, 0.5);
        }

        .fa-caret-right {
            color: darkgrey;
        }
    }
`;
