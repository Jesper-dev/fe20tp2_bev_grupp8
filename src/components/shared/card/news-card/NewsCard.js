import React from 'react';
import { Link } from 'react-router-dom';
import ContentWrapper from './NewsCardElement';
import * as ROUTES from '../../../../constants/routes';


const NewsCard = ({ title, summary }) => {

    return (
        <ContentWrapper>
            <h1>{title}</h1>
            <p>{summary}</p>
            <Link to={ROUTES.SOCIAL}>Read more</Link>
        </ContentWrapper>
    );
};

export default NewsCard;
