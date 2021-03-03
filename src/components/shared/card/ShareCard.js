import React from 'react';
import { CardWrapper } from './ShareCardElements';

const ShareCard = ({ name, cost, percent, fav }) => {
    return (
        <CardWrapper>
            <span>{name}</span>
            <span>{cost} $</span>
            <span>{percent.toFixed(2)}%</span>
            <span>info</span>
        </CardWrapper>
    );
};

export default ShareCard;
