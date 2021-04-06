import styled from 'styled-components';

const EmployeeOverviewWrapper = styled.article`
    box-sizing: border-box;
    flex: 2;

    h1 {
        margin: 0.5rem 0.25rem;
        color: #383838;
    }

    img {
        width: 1.5rem;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th {
        border-right: 1px solid lightgrey;
        border-bottom: 1px solid lightgrey;
        padding: 0.375rem;
        color: #a8a8a8;
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 1;
        white-space: nowrap;
        text-align: start;
        cursor: pointer;
    }

    td {
        border-right: 1px solid lightgrey;
        padding: 0.375rem;
        font-weight: 500;
        line-height: 1.75;

        &:first-child {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        & > i {
            color: grey;
        }
    }

    @media screen and (max-width: 640px) {
        min-width: 100%;
        overflow: auto;
    }
`;

export default EmployeeOverviewWrapper;
