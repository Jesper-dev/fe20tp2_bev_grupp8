import styled from 'styled-components'

export const ChatWrapper = styled.div`
    border: 1px solid black;
    height: 50vh;
    width: 50vh;

    .chat-wrapper {
        border: 1px solid black;
        height: 80%;
        display: flex;
        flex-direction: column;
    }

    .chat-wrapper > span {
        border: 1px solid black;
        padding: 8px;
        width: 50%;
        margin: 4px;
        border-radius: 20px;
    }
`