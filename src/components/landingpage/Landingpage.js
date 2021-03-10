import React from 'react';
import { ContentWrapper } from './LandingpageElements';
import { SignInAndOutBtn } from '../shared/button/ButtonElements';
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
                <Link to={ROUTES.SIGN_IN}>
                    <SignInAndOutBtn backgroundColor="var(--primary)">
                        Sign in
                    </SignInAndOutBtn>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                    <SignInAndOutBtn backgroundColor="var(--primary)">
                        Sign up
                    </SignInAndOutBtn>
                </Link>
            </div>
        </ContentWrapper>
    );
};

export default Landingpage;
