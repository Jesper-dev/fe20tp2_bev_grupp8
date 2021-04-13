import styled from 'styled-components';

const UserInfoCardElement = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    hr {
        width: 90%;
        border: none;
        max-width: 700px;
        height: 1px;
        color: #8e8e88; /* old IE */
        background-color: #dbdbdb; /* Modern Browsers */
    }

    p {
        max-width: 700px;
    }

    img {
        border-radius: 50%;
        width: 8rem;
        height: 8rem;
    }

    .currency {
        font-size: 1.125rem;
        font-weight: 500;
    }

    .container {
        display: flex;
        /* flex-wrap: wrap; */
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem 3rem;

        & > div {
           display: flex;
           flex-direction: column;
           align-items: center;
           gap: 0.75rem;
        }
    }

    & > label {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        & > button {
            background: var(--clr-primary);
            border: none;
            outline: none;
            min-width: 8rem;
            padding: 0.5rem 0.75rem;
            border-radius: 0.25rem;
            font-family: inherit;
            font-size: 0.875rem;
            color: var(--clr-almost-white);
            font-weight: 500;
            cursor: pointer;
            transition: background-color 125ms linear;

            &:hover {
                background-color: var(--clr-primary__brighter);
            }
        }

        & > span {
            font-weight: 500;
            font-size: 0.875rem;
            padding: 0.375rem;
            border-radius: 0.25rem;
            border: 0.125rem solid var(--clr-primary);
            min-width: 1.25rem;
            text-align: center;
        }
    }
`;

export default UserInfoCardElement;
