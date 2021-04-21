import styled from 'styled-components'

const TabBarElement = styled.nav`

    /* border-radius: 0.375rem; */
	/* margin: auto; */
/*     position: absolute; */
    width: 100%;
    max-width: 14rem;
    max-height: 30rem;
    margin-top: 8rem;
 /*    left: 30rem;
    top: 15%; */
    border-radius: 0.25rem;
    border: 1px solid lightgrey;
/*     height: 2.5rem; */
/*     background-color: var(--clr-primary-light); */

    .title {
        font-weight: 500;
        color: var(--clr-almost-black);

        &:hover, &:active {
					background-color: none;
				}
    }

    & > ul {
 /*        display: grid;
        grid-auto-flow: column; */
        padding: 0;
        margin: 0;
        height: 100%;
        list-style-type: none;
      
        
        & > li {
            padding: 0.5rem;
            border-top: 1px solid lightgrey;
            cursor: pointer;
            transition: background-color 125ms ease-in-out, color 125ms ease-in-out;
            &:nth-child(1) {
             border: none;
             &:hover, &:active {
					background: none;
				}
            }
            &:hover, &:active {
					background-color: var(--clr-primary-light__dimmer);
				}

                &.active {
					background-color: var(--clr-primary);
    				color: var(--clr-almost-white);

					&:hover, &:active {
						background-color: var(--clr-primary__brighter);
					}
				}
			& > a {
				/* display: flex;
				align-items: center;
				justify-content: center; */
				gap: 0.25rem;
				border-radius: 0.375rem;
				height: 100%;
				color: var(--clr-almost-black);
				font-size: 0.9rem;
				font-weight: 400;
				text-decoration: none;
				user-select: none;
				transition: background-color 125ms linear, color 125ms linear;

			
        	}
        }
    }
`;

export default TabBarElement;