import styled from 'styled-components';

export const Container = styled.div`
    height: 20px;
    width: 100%;
    background-color: #e0e0de;
    border-radius: 50px;
    margin: 5px;

    .fillerStyles {
        height: 100%;
        width: ${(props) => props.completed};
        background-color: ${(props) => props.bgcolor};
        border-radius: inherit;
        text-align: right;
    }

    .labelStyles {
        padding: 5px;
        color: white;
        font-weight: bold;
    }
`;
