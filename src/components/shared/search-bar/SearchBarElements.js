import styled from 'styled-components'

export const ContentWrapper = styled.div`


    /* form {
        position: relative;
        width: 100%;
        height: 120px;
        background-color: (--body);

    }

    input {
        width: 36px;
        height: 36px;


        border-radius: 4px;
        border: none;
        background: #ededed;


        transition: width 0.5s ease-in-out;


        &:focus{
            width: 80%;
             outline: none;
        }
        &:focus::placeholder{
            opacity: 0;
        }
    } */

    padding: 1rem;


    .label {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        color: #383838;
        font-family: inherit;
        font-size: 0.875rem;
        font-weight: 600;

        position: relative;
    }

    .input {
        height: 2.25rem;
        width: 2.25rem;
        padding: 0;
        border: 0.09375rem solid #C8C8C8;
        border-radius: 0.25rem;
        outline: none;
        background: none;
        color: #383838;
        font-family: inherit;
        font-size: 0.875rem;
        font-weight: 500;
        line-height: 1rem;
        text-indent: 0.375rem;

        &::placeholder {
            opacity: 0;
        }

        /* transition: all 1s ease-in-out; */

        &:focus {
            width: 100%;
            padding-right: 2.25rem;
            border: 1px solid var(--third);
            border-radius: 4px;
        }

        &:focus::placeholder {
            opacity: 1;
            color: grey;
        }
    }

    /* ::-webkit-search-cancel-button */

    .input + svg {
        position: absolute;
        left: 0.375rem;
        bottom: 0.375rem;
        fill: #C8C8C8;
        /* transition: 1s ease-in-out; */
    }

    .input:focus + svg {
        position: absolute;
        /* left: calc(100% - 1.875rem); */
        /* left: 90%; */
        right: 0.375rem;
        bottom: 0.375rem;
        fill: var(--third);
    }
`