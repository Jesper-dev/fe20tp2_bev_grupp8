import styled from 'styled-components';

export const UserWrapper = styled.div`
    width: 100%;
    max-width: 40rem;

    box-sizing: border-box;
    background: var(--body);
    box-shadow: var(--box-shadow-cards);
    border-radius: 0.25rem;
    padding: 1rem;

    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;

    & > div {
        width: 50%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;

        .username {
            font-weight: 600;
            font-size: 1.125rem;
        }
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

        .fa-user {
            color: darkgrey;
        }
    }

    img {
        width: 56px;
        height: 56px;
        box-shadow: var(--box-shadow-cards);
        border-radius: 50%;
    }
`;
