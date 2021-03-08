import React from 'react';
import { ContentWrapper } from './LandingpageElements';
import { SignInAndOutBtn } from '../shared/button/ButtonElements';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

const Landingpage = () => {
    return (
        <ContentWrapper>
            <h2>Welcome to Let's Vest!</h2>
            <p>Already have an account? Signin, otherwise signup!</p>
            <div>
                <Link to={ROUTES.SIGN_IN}>
                    <SignInAndOutBtn>Sign in</SignInAndOutBtn>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                    <SignInAndOutBtn>Sign up</SignInAndOutBtn>
                </Link>
            </div>
        </ContentWrapper>
    );
};

export default Landingpage;
