import styled from 'styled-components'


export const NavbarLeftElement = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background: var(--body);
    width: 14rem;

    border-right: 1px solid var(--body-third);
    
    ul {
        padding: 0;
        margin: 0;
        list-style-type: none;
    }

    li {
        padding: 0.1875rem 0.375rem;
    }

    a {
        display: flex;
        align-items: center;
        justify-content: start;
        padding: 0 1rem;
        border-radius: 0.25rem;
        gap: 0.5rem;
        height: 2.5rem;
        color: var(--body-fourth);
        font-size: 1.1rem;
        text-decoration: none;
        transition: background-color 125ms ease-in-out, color 125ms ease-in-out;

        &:hover {
            background-color: var(--light-blue);
        }
    }

    .active {
        background-color: var(--light-blue);
        color: var(--secondary);
    }

    .logo-link {
        margin: 1.5rem 0;
    }

    .logo-link:hover {
        background: none;
    }

    .logo-left-nav {
        width: 12rem;
    }

    @media screen and (max-width: 1024px) {
        display: none;
    }
`;