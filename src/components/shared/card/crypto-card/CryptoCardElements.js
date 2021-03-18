import styled from 'styled-components';

export const CardWrapper = styled.div`
    /*    border: 2px solid var(--primary); */
    box-shadow: var(--box-shadow-cards);
    border-radius: 4px;
    background: var(--body);
    width: 90vw;
    min-height: 38px;
    display: flex;
    align-items: center;
    justify-content: space-around;

    span {
        font-size: 0.9rem;
        font-weight: bold;

        .fa-info-circle {
            color: var(--body-fourth);
        }
    }

    a:visited {
        color: var(--body-fifth);
    }

    button {
        background: none;
        border: 1px solid black;
        padding: 8px;
        outline: none;
    }

    img {
        width: 25px;
        height: 25px;
    }
`;
