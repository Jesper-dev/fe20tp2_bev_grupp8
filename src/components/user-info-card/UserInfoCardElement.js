import styled from 'styled-components';

const UserInfoCardElement = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    margin-bottom: 3.5rem;
    background-color: var(--body-secondary);
    width: 100%;

    img {
        border-radius: 50%;
        width: 7.5rem;
        height: 7.5rem;
    }

    p {
        margin-top: 1rem;
    }

    .post-card {
        box-sizing: border-box;
        width: 100%;
        max-width: 40rem;
        padding: 1rem;
        background-color: var(--body);
        box-shadow: var(--box-shadow-cards);
        border-radius: 0.25rem;
    }

    .followerWrapper {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 10%;
    }

    .followerWrapper > p {
        margin: 0%;
    }
`;

export default UserInfoCardElement;
