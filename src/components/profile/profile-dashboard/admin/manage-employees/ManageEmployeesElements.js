import styled from 'styled-components';

export const ManageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    background: var(--body-secondary);
    border-radius: 4px;
    box-shadow: var(--box-shadow-cards);
    margin: 8px;
    width: 40%;
    height: 400px;

    h3 {
        margin: 16px;
        margin-bottom: 0;
    }

    .emailWrapper {
        display: flex;
        flex-direction: column;
        width: 95%;
        height: 50%;
        background: white;
        margin: 0px 8px;
        overflow: auto;
        /*         border: 1px solid black; */
        border-radius: 10px;
    }

    form {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    form > label {
        font-size: 0.8rem;
        margin: 8px;
        max-width: 210px;
    }

    form > label > input {
        width: 100%;
        padding: 0.5rem 0.375rem 0.5rem 0;
        border: 0.09375rem solid #c8c8c8;
        border-radius: 0.25rem;
        outline: none;
        background: none;
        color: #383838;
        font-family: inherit;
        font-size: 0.8125rem;
        font-weight: 500;
        text-indent: 0.375rem;
        transition: border-color 125ms linear, box-shadow 125ms linear;
        &:hover {
            border-color: var(--third);
        }

        &:focus {
            border-color: var(--third);
            box-shadow: 0 0 0 0.1875rem #ddeafd;
        }

        &:invalid {
            border-color: #e68e8e;
            box-shadow: 0 0 0 0.1875rem #fddddd;
        }

        &:invalid:not(:focus) {
            border-color: #e68e8e;
            box-shadow: none;
        }
    }

    form > button {
        color: var(--lighter-green);
        background: none;
        border: none;

        /* Maring is not best solution. Fixed this way since align center centers button relative to label height. */
        margin-top: 10px;

        padding: 8px;
        font-size: 1.1rem;
        outline: none;
        cursor: pointer;

        &:hover {
            /*          background-color: var(--primary-dark); */
        }

        &:disabled {
            background-color: grey;
            cursor: initial;
        }
    }
`;
