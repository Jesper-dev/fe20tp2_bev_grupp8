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
    }
`