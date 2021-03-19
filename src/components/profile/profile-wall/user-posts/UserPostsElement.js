import styled from "styled-components"

const UserPostElement = styled.section`
    height: 60vh;
	overflow: auto;
	h2{
		margin: 16px 16px;
	}
    div{
		border: 2px solid var(--secondary);
		height: 120px;
		margin: 16px 0px;
		padding: 8px;
	}

	div > p{
		margin: 8px 0px;
	}
`;

export default UserPostElement;