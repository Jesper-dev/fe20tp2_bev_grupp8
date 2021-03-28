import styled from 'styled-components';

export const NavBar = styled.nav`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
	align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: #eee;

    ul {
        display: flex;
        gap: 1rem;
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    h1 {
        color: var(--primary);
        white-space: nowrap;
    }

	.logo-lets{
		height: 60px;
		width: 300px;
	}
`;

export const Banner = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	padding: 2rem 1rem;
	max-height: 75vh;

	ul {
		display: flex;
        flex-wrap: wrap;
        justify-content: center;
		gap: 0.5rem;
		list-style-type: none;
		margin: 0;
		padding: 0;
	}

	svg {
		width: 256px;
		height: 256px;
	}

	h2, p {
		margin: 0;
		text-align: center;
        max-width: 40rem;
	}

	h2 {
		font-size: 2.5rem;
	}
`;

export const About = styled.section`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 1rem;
	padding: 1rem;
	background-color: var(--secondary);

	div {
		width: 12rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		border-radius: 0.25rem;
		background-color: white;

		svg {
			width: 120px;
			height: 120px;
		}
	}
`;