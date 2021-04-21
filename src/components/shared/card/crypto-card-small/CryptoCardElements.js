import styled from 'styled-components';

export const CardWrapper = styled.article`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0.1rem 0.9rem;
    /*     border-radius: 0.25rem; */
    box-shadow: var(--box-shadow-cards);
    max-width: 20rem;
    width: 100%;
    min-height: 2rem;
    max-height: 48px;
    background-color: ${({ i }) =>
        i % 2 === 0 ? 'var(--body)' : 'var(--body-third)'};

    cursor: pointer;

    &:hover > a > span > i {
        transition: color 250ms ease-in-out;
      color: var(--clr-primary);
    }

    img {
        width: 20px;
    }

    & > span {
        flex: 1;
        font-size: 0.8rem;
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
        width: 1rem;
        height: 1rem;
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
