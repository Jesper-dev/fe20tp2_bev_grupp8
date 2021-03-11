import styled from "styled-components"

export const ContentWrapper = styled.div`

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    padding: 8px;
    border-bottom: 4px solid var(--secondary);

    h3 {
        margin: 0%;
        margin-top: 24px;
        color: var(--secondary);
        text-align: center;
    }

    div{
        margin: 16px;
        display: flex;
        align-items: center;

    }

    div > input {
        height: 24px;
        width: 24px;
        margin-left: 16px;
        outline: none;
        border-radius: 0.7rem;
    }

    div > label {
        font-size: 1.3rem;
    }

    input[type="checkbox"]:checked {
        animation: checked 0.5s;
    }

    input[type="checkbox"]:not(:checked){
        animation: unChecked 0.5s;
    }

    @keyframes checked {
        0% {
            transform: scale(0.75);

        }
        50% {
            transform: scale(1.3);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes unChecked {
        0% {
            transform: scale(0.75);

        }
        50% {
            transform: scale(1.3);
        }
        100% {
            transform: scale(1);
        }
    }

`


