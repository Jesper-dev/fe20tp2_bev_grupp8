import styled from 'styled-components';

export const EmployeeWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 8px;
    background-color: ${({ i }) =>
        i % 2 === 0 ? 'var(--body-third)' : 'var(--body)'};

    .wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    i {
        margin-right: 8px;
        color: var(--clr-primary);
        cursor: pointer;
    }

    .toolbar {
        display: ${({ open }) => (open ? 'flex' : 'none')};
        align-items: center;
        height: 60px;
        width: 50%;
        background-color: none;
    }

    .toolbar > button {
        margin: 8px;
    }

    .toolbar > button:hover {
        color: black;
        border: 2px solid black;
    }
`;
