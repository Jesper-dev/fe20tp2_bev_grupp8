import styled from 'styled-components'


export const ProfileNavbarElement = styled.nav`
    background: #e3ecfc;
    border-radius: 2.5rem;
    width: 100%;
    max-width: 28rem;
    height: 2.5rem;

    ul {
        position: relative;
        display: grid;
        grid-auto-flow: column;
        padding: 0;
        border-radius: 1rem;
        margin: 0;
        height: 100%;
        list-style-type: none;

        li {
            padding: 0.25rem;
        }

        a {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            border-radius: 1rem;
            height: 100%;
            color: #53588b;
            font-size: 0.75rem;
            font-weight: 500;
            text-decoration: none;
            transition: background-color 125ms linear, color 125ms linear;

            &:hover {
                background-color: var(--primary);
                color: white;
            }

            &.active {
                background: var(--primary);
                color: white;
            }
        }
    }
`