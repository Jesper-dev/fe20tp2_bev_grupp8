import styled from 'styled-components'

export const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh;

    div {
        height: 60%;
        width: 40%;
    }



    .toast {
        position: absolute;
        right: 50;
        left: 50;
        bottom: 5rem;
        border-radius: 0.25rem;
        box-shadow: var(--box-shadow-cards);
        margin: auto;
        width: 20rem;
        height: 2.75rem;
        line-height: 2.75rem;
        background-color: blue;
        color: var(--clr-almost-white);
        font-weight: 500;
        text-align: center;
        transition: transform 150ms linear;

        a {
            margin-left: 0.5rem;
            color: var(--clr-almost-white);
        }
    }


`

export const AchievmentsCardWrapper = styled.article`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 0.5rem;
    /*    padding: 0 1rem; */
    padding: 0.5rem 0.75rem;
    border-radius: 0.25rem;
    box-shadow: var(--box-shadow-cards);
    width: 100%;
    min-height: 3rem;
    background: var(--body);
    cursor: pointer;
    margin-top: 8px;
    opacity: ${props => props.done ? '100%' : '40%'};

    & > span {
        /* flex: 1; */
        font-size: 1rem;
        /* width: 10%; */
        font-weight: 600;
        text-align: center;
        white-space: nowrap;
    }

    input {
        display: ${props => props.done ? 'block' : 'none'};
        padding: 8px;
        cursor: pointer;
    }



`