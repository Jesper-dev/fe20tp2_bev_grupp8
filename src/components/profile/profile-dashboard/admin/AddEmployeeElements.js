import styled from 'styled-components'


export const AddEmailWrapper = styled.div`
    position: absolute;
    right: 0;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    background: var(--body);
    border: 2px solid var(--secondary);
    border-radius: 4px;
    box-shadow: var(--box-shadow-cards);
    margin: 8px;

    width: ${({ open }) => (!open ? '35px' : '95%')};
    height: ${({ open }) => (!open ? '35px' : '300px')};

    /* transition: all 0.4s; */

    h3 {
        display: ${({ open }) => (!open ? 'none' : 'block')};
    }

    p {
        font-size: 2rem;
        margin: 8px;
        text-align: right;
    }

    .emailWrapper {
        display: ${({ open }) => (!open ? 'none' : 'block')};
        width: 95%;
        height: 50%;
        background: white;
        margin: 0px 8px;
        overflow: auto;
        border: 1px solid black;
        border-radius: 10px;
    }

    form {
        display: ${({ open }) => (!open ? 'none' : 'flex')};
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    form > label {
        margin: 8px;
    }

    form > label > input {
        width: 60%;
    }

    form > button {
        padding: 8px 16px;
        font-size: 1.1rem;
        margin: 8px;
    }
`;