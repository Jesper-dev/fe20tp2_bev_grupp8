import styled from "styled-components";

const UserInfoCardElement = styled.div`
	display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    margin-bottom: 3.5rem;
    background-color: var(--body-secondary);

	img {
		width: 3.5rem;
		height: 3.5rem;
	}
`;

export default UserInfoCardElement;