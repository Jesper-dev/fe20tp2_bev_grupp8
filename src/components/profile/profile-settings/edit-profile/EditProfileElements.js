import styled from 'styled-components';

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    /*     justify-content: center; */
    /*     align-items: center; */
    gap: 1rem;
    height: 100vh;
    width: 100%;
    max-width: 40rem;

    padding: 8rem;

    @media screen and (max-width: 550px) {
        padding: 0px;
    }

    .topbar-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        /*         flex-direction: row; */
    }

    .user-info {
        display: flex;
        flex-wrap: wrap;
        border: 1px solid lightgrey;
        border-radius: 0.25rem;
        gap: 1rem;
        padding: 1rem;

        @media screen and(max-width: 550px) {
            flex-direction: column;
            padding: 0;
            min-width: 90%;
            gap: 0;
        }

        .delete-account-btn {
            padding: 0.375rem 0.375rem;
            border: 0.125rem solid var(--lighter-red);
            border-radius: 0.25rem;
            background: none;
            color: var(--lighter-red);
            font-family: inherit;
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 125ms linear, color 75ms linear;

            &:hover {
                background-color: var(--lighter-red);
                color: white;
            }
        }

        textarea {
            width: 30rem;
            height: 8rem;
            padding: 0.5rem;
            border: 0.1rem solid #ddd;
            border-radius: 0.25rem;
            outline: none;
            background: none;
            font-family: inherit;
            resize: none;
            transition: border-color 125ms linear, box-shadow 125ms linear;

            @media screen and (max-width: 550px) {
                width: 100%;
            }

            &::placeholder {
                color: grey;
                opacity: 1;
            }

            &:focus {
                border-color: var(--clr-primary__brighter);
                box-shadow: 0 0 0 0.1875rem var(--clr-primary-light__dimmer);
            }


        }
    }

    .bio-wrapper {
        @media screen and (max-width: 550px) {
                width: 100%;
            }
    }
    label {
        display: flex;
        flex-direction: column;

        input {
            background: none;
            padding: 0.375rem 0.375rem 0.375rem 0;
            border: 0.09375rem solid #c8c8c8;
            border-radius: 0.25rem;
            outline: none;
            color: #383838;
            font-family: inherit;
            font-size: 0.8125rem;
            font-weight: 500;
            text-indent: 0.375rem;
        }
    }
    h4 {
        margin: 0;
        font-weight: 500;
        font-size: 1rem;
    }
    h3 {
        margin: 0;
        font-weight: 500;
        font-size: 1.25rem;
    }

    hr {
        align-self: flex-start;
        width: 100%;
        border: none;
        /* max-width: 500px; */
        margin: 0;
        height: 1px;
        color: #8e8e88; /* old IE */
        background-color: #dbdbdb; /* Modern Browsers */
    }
`;
