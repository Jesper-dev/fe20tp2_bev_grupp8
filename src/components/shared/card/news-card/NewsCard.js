import React from 'react';
import { Link } from "react-router-dom";
import ContentWrapper from './NewsCardElement';
import * as ROUTES from '../../../../constants/routes';

const NewsCard = ({ title = `Let's Vest goes public and disrupts the market!`, summary = 'Yes news very true' }) => {
    return (
        <ContentWrapper>
            <h1>{title}</h1>
            <p>{summary}</p>
			<Link to={ROUTES.SIGN_IN}>Read more</Link>
        </ContentWrapper>
    );
};

export default NewsCard;
