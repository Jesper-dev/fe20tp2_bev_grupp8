import styled from 'styled-components'

export const EmployeeWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px;
    background-color: ${({i}) => (i % 2 === 0 ? 'var(--body-third)' : 'var(--body)')};

    span {
        margin-right: 8px;
        cursor: pointer;
    }

`