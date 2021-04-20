import styled from 'styled-components';

export const ContentWrapper = styled.div`

    display: flex;
    flex-direction: column;
/*     align-items: center; */
/*     justify-content: center; */
    gap: 1rem;
    padding: 8rem;
/*     padding: 6rem 8rem 8rem 8rem; */
    width: 100%;
    max-width: 40rem;

    @media screen and (max-width: 550px) {
        padding: 0px;
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

    .home-wrapper{
        display: flex;
        flex-wrap: wrap;
        border: 1px solid lightgrey;
        border-radius: 0.25rem;
        gap: 1rem;
        padding: 1rem;
    }

    h3 {
        margin: 0;
        font-weight: 500;
        font-size: 1.25rem;
    }
    h4 {
        margin: 0;
        font-weight: 500;
        font-size: 1rem;
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
        background-color: var(--clr-primary);

        &:active {
            background-color: var(--clr-primary__dimmer);
        }
    }

    /* Moves toggle indicator when checkbox is checked */
    .checkbox:checked + .toggle-btn:after {
        left: 50%;
    }
`;
