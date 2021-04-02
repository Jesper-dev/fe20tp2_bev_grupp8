import styled from 'styled-components';

export const TabBarDropDownElement = styled.section`
    .dropdown {
        display: flex;
        justify-content: space-evenly;
        margin: 0;
        padding: 0;
        list-style: none;
        width: 250px;
        background-color: var(--light-blue);
        border-radius: 4px;
        cursor: pointer;
    }

    .dropdown li {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .dropdown li a {
        color: #000;
        text-align: center;
        text-decoration: none;
        display: block;
        padding: 8px;
    }

    .dropdown li ul {
        position: absolute;
        top: 100%;
        margin: 0;
        padding: 0;
        list-style: none;
        display: none;
        line-height: normal;
        background-color: var(--light-blue);
        border-radius: 4px;
        height: inherit;
    }

    .dropdown li ul li a {
        display: flex;
        align-items: center;
        justify-content: center;

        text-align: left;
        color: #000;
        font-size: 14px;
        padding: 10px;
        /*     display: block; */
        white-space: nowrap;
    }

    .dropdown li ul li a:hover {
        /*  transition: background-color 125ms linear, color 125ms linear;
        background-color: var(--primary);
        height: 6px; */
        color: #fff !important;
    }

    .dropdown li ul li ul {
        left: 100%;
        top: 0;
    }

    ul li:hover > a {
        display: flex;
        align-items: center;
        justify-content: center;
        /*      height: 35%; */
        transition: background-color 125ms linear, color 125ms linear;
        background-color: #d2dff7;
        border-radius: 4px;
        color: #fff !important;
    }

    ul li:hover > ul {
        display: block;
    }
`;
