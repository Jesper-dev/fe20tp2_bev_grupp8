import styled from 'styled-components';

export const Mainwrapper = styled.section`
    display: flex;
    justify-content: center;
    /* 	align-items: center; */
    /* background: linear-gradient(var(--clr-primary-light__dimmer), var(--clr-primary-light)); */
    height: 100vh;

    @media screen and (max-width: 550px) {
        flex-direction: column;
        margin-top: 56px;
    }


`;

export const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;

    .primary {
        color: black;

        .fa-trophy {
            color: gold;
        }
    }
`;
