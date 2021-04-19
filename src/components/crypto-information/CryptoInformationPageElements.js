import styled from 'styled-components';

export const MainWrapper = styled.main`
    /* min-height: 100vh; */
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    /* background-color: var(--body-secondary); */
    /* margin-bottom: 56px; */
    /* width: 100%; */

	& > div > div > a {
		height: 1.125rem;
		padding: 0.5rem 0.75rem;
		margin-right: 1.5rem;
	}
	
    .information-wrapper {
        width: 90vw;
        max-width: 700px;
    }

    h1 {
        text-align: center;
        margin: 8px;
    }

    p {
        /*         border: 2px solid var(--primary); */
        box-shadow: var(--box-shadow-cards);
        border-radius: 4px;
        padding: 16px;
        margin: 8px;
        font-size: 1.1rem;
        line-height: 1.35;
        /*         display: flex;
        align-items: center; */
    }
    /*
    button {
        padding: 0.75rem 1rem;
        background: none;
        border: 2px solid black;
        outline: none;
        border-radius: 0.25rem;
        cursor: pointer;
        font-family: inherit;
    } */

    button:focus {
        box-shadow: var(--box-shadow-focus);
    }

    button:not(:focus-visible) {
        box-shadow: none;
    }

    .buttonWrapper {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }

    .buttonWrapper > input {
        width: 20%;
    }

    .imgWrapper {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    img {
        width: 60px;
        height: 60px;
        align-self: center;
    }
`;

export const DescriptionWrapper = styled.section`
    transition: height 0.45s ease-in-out;
    height: ${({ descClicked }) => (!descClicked ? '180px' : '350px')};
    overflow: hidden;

    box-shadow: var(--box-shadow-cards);
    border-radius: 4px;
	padding: 0.25rem;
    margin: 8px;
    line-height: 1.45;
    cursor: pointer;
	font-size: 1rem;
`;
