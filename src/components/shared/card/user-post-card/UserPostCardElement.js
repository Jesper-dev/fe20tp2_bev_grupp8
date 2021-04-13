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

    & > a {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.375rem 0.5rem;
        border-radius: 0.25rem;
        max-width: min-content;
        text-decoration: none;
        color: var(--clr-primary);

        &:hover {
            background-color: #e8e8e8;
        }
    }

    a {
        text-decoration: none;
        color: var(--clr-primary);
        text-underline-offset: 0.25rem;
        transition: text-underline-offset 125ms linear;

        &:hover{
            text-decoration: underline;
            text-decoration-thickness: 0.125rem;
            text-decoration-skip-ink: none;
            text-underline-offset: 0.4375rem;
        }
    }

    h2 {
        margin: -3rem 0rem 2rem 6rem;
        color: #383838;
        font-size: 1.25rem;
        font-weight: 600;
    }

    time {
        color: darkgrey;
        font-size: 0.875rem;
    }

    img {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;

        &:hover {
            opacity: 0.7;
        }
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
        &:active{
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
