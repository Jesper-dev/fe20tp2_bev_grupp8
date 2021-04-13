import styled from 'styled-components';

const UserPostCardWrapper = styled.article`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
    border-radius: 0.25rem;
    box-shadow: var(--box-shadow-cards);
    width: 100%;
    background-color: var(--body);

    h2 {
        margin: 0;
        color: #383838;
        font-size: 1.25rem;
        font-weight: 600;
    }

    time {
        color: darkgrey;
        font-size: 0.875rem;
    }

    img {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
    }

    & > div {
        display: flex;
        align-items: center;
        gap: 0.375rem;
    }

    label {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        padding: 0.25rem;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        transition: background-color 125ms linear;

        &:hover,
        &:active {
            background-color: rgb(200, 0, 0, 0.1);
        }

        .checkbox {
            appearance: none;
            display: none; // TMP FIX: Not ideal for accessibility!
        }

        .fa-heart {
            color: var(--light-grey);
        }

        .checkbox:checked ~ .fa-heart {
            color: red;
        }
    }
`;

export default UserPostCardWrapper;
