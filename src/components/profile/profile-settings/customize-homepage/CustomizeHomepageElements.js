import styled from 'styled-components';

export const ContentWrapper = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;

    h3 {
        margin: 0;
        font-size: 1.25rem;
        text-align: center;
    }


    /* Toggle container */
    .tgl {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        width: 100%;
        max-width: 32rem;
    }

    /* Hides default checkbox */
    .checkbox {
        display: none;
    }

    /* Styles the toggle button */
    .toggle-btn {
        display: block;
        padding: 0.125rem;
        border-radius: 1rem;
        width: 3rem;
        height: 1.5rem;
        background-color: lightgrey;
        cursor: pointer;
        transition: background-color 250ms ease;

        &:active {
            background-color: rgb(192, 192, 192);
        }

        /* Styles the toggle indicator */
        &::after {
            position: relative;
            display: block;
            content: "";
            left: 0;
            border-radius: 50%;
            width: 50%;
            height: 100%;
            background-color: white;
            transition: left 250ms ease;
        }
    }

    /* Changes the toggle buttons background when checkbox is checked */
    .checkbox:checked + .toggle-btn {
        background-color: var(--primary);

        &:active {
            background-color: var(--primary-dark);
        }
    }

    /* Moves toggle indicator when checkbox is checked */
    .checkbox:checked + .toggle-btn:after {
        left: 50%;
    }
`;
