import styled from 'styled-components';

export const PortOverviewWrapper = styled.article`
	background-color: var(--body);
	padding: 1rem;
	border-radius: 0.25rem;
    box-shadow: var(--box-shadow-cards);

    box-sizing: border-box;
    width: 100%;
    max-width: 40rem;
    margin: 2rem auto 0 auto;

	h2 {
		margin: 0;
		color: #383838;
		font-size: 1.25rem;
		font-weight: 600;
	}

    & > header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .percent {
            margin-left: 0.5rem;
            font-size: 1rem;
        }

        .total {
            font-weight: 500;
        }

        .fa-wallet{
            color: var(--secondary);
            margin-right: 0.25rem;
        }
    }
`;
