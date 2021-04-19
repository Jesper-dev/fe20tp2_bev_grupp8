import styled from 'styled-components';

const LikedPostsElement = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin: 2rem auto;
    width: 100%;
    max-width: 40rem;
    max-height: 80vh;
    overflow-y: auto;

    scrollbar-width: thin;
    scrollbar-color: var(--clr-primary-light__dimmer) #cccccc;

    &::-webkit-scrollbar-track
    {-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #CCCCCC;
    }

    &::-webkit-scrollbar{
	width: 12px;
	background-color: #CCCCCC;
    }

    &::-webkit-scrollbar-thumb{
	border-radius: 0px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: var(--clr-primary-light__dimmer);
/* 	background-color: #555; */
}
`;

export default LikedPostsElement;
