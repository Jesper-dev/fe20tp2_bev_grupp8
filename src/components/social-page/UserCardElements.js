import styled from 'styled-components'


export const UserWrapper = styled.div`
    height: 75px;

  /*   border: 1px solid var(--body-fourth); */
    background: var(--body);
    box-shadow: 1px 1px 3px 1px rgb(0 0 0 / 25%);
    margin: 8px;
    border-radius: 4px;

    display: flex;
    flex-flow: nowrap row;
    justify-content: space-between;
    align-items: center;

    .fa-door-open {
        color: var(--secondary);
        margin: 4px;
    }

    >div {
        display: flex;
        flex-flow: column nowrap;
        height: inherit;
        justify-content: space-around;
        align-items: center;
        width: 40%;

    }

    span {
        font-size: 1rem;
    }

    img {
        width: 60px;
        height: 60px;
        margin: 4px;
        border-radius: 50%;
        border: 2px solid var(--secondary);
    }
`