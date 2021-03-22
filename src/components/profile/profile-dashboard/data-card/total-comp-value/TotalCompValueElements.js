import styled from 'styled-components'


export const ContentWrapper = styled.div`

    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: var(--box-shadow-cards);
    background-color: var(--body);

        h1{
            font-size: 0.9rem;
        }
    header {
        display: flex;
        flex-direction: column;
        /* flex-wrap: wrap; */
        justify-content: space-between;
      /*   align-items: center; */

        .total-wrapper{
            width: 100%;
            justify-content: space-between;
            display: flex;
            flex-direction: row;
        }

        .percent {
            font-size: 0.9rem;
        /*     vertical-align: middle; */
        }

        .total {
            font-weight: 500;
            font-size: 1rem;
        }

    }
`


export const EmployeesValue = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    p, span{
        padding: 2px 0 2px 0;
    }
`