import React from 'react';
import { Container } from './ProgressbarElements';

const ProgressBar = (props) => {
    const { bgcolor, completed } = props;
    return (
        <Container completed={completed} bgcolor={bgcolor}>
            <div className="fillerStyles ">
                <span className="labelStyles">{`${completed}`}</span>
            </div>
        </Container>
    );
};

export default ProgressBar;
