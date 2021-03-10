import React from 'react';
import { ContentWrapper } from './LandingpageElements';
import { SignInAndOutLink } from '../shared/button/ButtonElements';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

import MoneySvg from '../svgs/LandingSvg';

const Landingpage = () => {
    return (
        <ContentWrapper>
            <h2>Welcome to Let's Vest!</h2>
            <MoneySvg className="money-svg" />
            <p>New to the webiste? Join below today! Otherwise sign in.</p>
            <div>
                <SignInAndOutLink
                    to={ROUTES.SIGN_IN}
                    backgroundColor="var(--primary)"
                >
                    Sign In
                </SignInAndOutLink>
                <SignInAndOutLink
                    to={ROUTES.SIGN_UP}
                    backgroundColor="var(--primary)"
                >
                    Sign Up
                </SignInAndOutLink>
            </div>
        </ContentWrapper>
    );
};

export default Landingpage;
