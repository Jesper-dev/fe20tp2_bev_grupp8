import styled from 'styled-components'

export const Wrapper = styled.section`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
	padding: 2rem;

	.quick-cards-wrapper {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		.quick-info-cards {
			display: flex;
			gap: 0.5rem;

			& > article {
				flex: 1;
			}
		}

		.featured {
			flex: 1;
		}
	}

	.employees {
		box-sizing: border-box;
		flex: 2;
	}

	@media screen and (max-width: 640px) {
		padding: 1rem 0;

		.quick-info-cards {
			flex-wrap: wrap;
		}

		.employees {
			min-width: 100%;
			overflow: auto;
		}
	}

	/* ... */

	article {
		padding: 1rem;
		border-radius: 0.25rem;
		box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.04), 1px 1px 1px rgba(0, 0, 0, 0.04);
		background-color: white;
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
	}

	h1 {
		margin: 0;
		color: #a8a8a8;
		font-size: 0.75rem;
		text-transform: uppercase;
		white-space: nowrap;
	}

	h2 {
		margin: 0.1875rem 0 0 0;
		color: #383838;
		white-space: nowrap;
	}
	
	h3 {
		margin: 0.5rem 0.25rem;
		color: #383838;
	}
`