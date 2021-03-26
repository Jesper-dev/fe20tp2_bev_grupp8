import styled from 'styled-components';

export const PortOverviewWrapper = styled.div`
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: var(--box-shadow-cards);
    background-color: var(--body);

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .percent {
            font-size: 1rem;
            vertical-align: middle;
        }

        .total {
            font-weight: 500;
        }

        .fa-wallet{
            color: var(--secondary);
        }
    }
`;
