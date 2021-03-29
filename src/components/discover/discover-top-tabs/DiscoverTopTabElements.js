import styled from 'styled-components'

export const TabWrapper = styled.nav`
    background: #e3ecfc;
    border-radius: 2.5rem;
    width: 100%;
    max-width: 24rem;
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
                background-color: #e5b459;
            }

            &.active {
                background: #e5b459;
            }
        }
    }

    /* nav { */
        /* position: relative;
        display: block;
        background-color: #e8f0ff; */
        /*          background-color: #f6f9ff; */
        /* background-color: var(--third); */
        /*   padding: 6px; */
        /* border-radius: 30px;
        transform: scale(1.8);
        overflow: hidden;
        width: 100%; */
    /* } */

/*     nav a {
        position: relative;
        text-decoration: none;
        color: #53588b;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: 7px;
        line-height: 1;
        text-align: center;
        display: inline-block;
        width: 45px;
        padding: 6px;
        box-sizing: border-box;
        z-index: 2;
        cursor: pointer;
    } */

/*     nav a b {
        position: relative;
        top: 40px;
        transition: 0.3s ease top;
    } */

/*     nav a i {
        position: relative;
        left: 10%;
        transition: 0.3s ease left;
    } */

/*     nav span {
        position: absolute;
        width: 45px;
        background-color: #d6e4ff; */
        /* background-color: #e5eeff; */
/*         top: 3px;
        bottom: 3px;
        left: 3px;
        border-radius: 50px;
        z-index: 1;
        transition: 0.3s ease left;
    }

    nav a:hover b {
        top: 0;
    }

    nav a:hover i {
        left: 0;
    }

    nav a:nth-child(1):hover ~ span {
        left: 3px;
    }

    nav a:nth-child(2):hover ~ span {
        left: 45px;
    }

    nav a:nth-child(3):hover ~ span {
        left: 87px;
    } */
`;