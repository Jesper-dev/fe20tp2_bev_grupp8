import styled from "styled-components"

const LikedPostsElement = styled.section`
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
`;

export default LikedPostsElement;