import React from 'react';
import { Link } from 'react-router-dom';
import ContentWrapper from './NewsCardElement';
import * as ROUTES from '../../../../constants/routes';
import { useSelector } from 'react-redux';

const NewsCard = ({ title, summary }) => {
    const SeeNewsRedux = useSelector((state) => state.SeeNews);
    return (
        <ContentWrapper
            style={SeeNewsRedux ? { display: 'block' } : { display: 'none' }}
        >
            <h1>{title}</h1>
            <p>{summary}</p>
            <Link to={ROUTES.SOCIAL}>Read more</Link>
        </ContentWrapper>
    );
};

export default NewsCard;
