import styled from 'styled-components'

export const Wrapper = styled.div`
    display: flex;
	flex-direction: column;
	gap: 1.25rem;
	margin: auto;
	width: 100%;
	max-width: 40rem;
	max-height: 60vh;
	overflow: auto;

	h1 {
		margin: 2rem 0 0 0;
	}

	textarea {
		resize: none;
		border: 1px solid var(--clr-primary__brighter);
		outline: none;
	}

	button {
		width: 20%;
		
	    @media screen and (min-width: 1024px) {
		    width: 10%;
		    background: none;
		    border-radius: 5px;
        }
		
	}

	button:hover {
		color: black;
	}

	.editable {
		border: 1px solid var(--clr-primary__brighter);
	}
`