import styled from "styled-components"

export const PostsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 2rem;


    @media screen and (max-width: 500px) {
        flex-direction: column;
    }
`