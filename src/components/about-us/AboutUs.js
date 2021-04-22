import React,{ useContext } from 'react'
import { NavBar } from '../landingpage/LandingpageElements';
import { ContentWrapper } from './AboutUsElements'

import { Button } from '../shared/button/ButtonElements';
import * as ROUTES from '../../constants/routes';
import FirebaseContext from '../firebase/context';
// import { Link } from 'react-router-dom';

import MoneySvg from '../svgs/LandingSvg';
import InvestSvg from '../svgs/InvestSvg';
import ProfitsSvg from '../svgs/ProfitsSvg';
import LogoLets from '../svgs/LogoLets';

import CreatorsImage from '../../img/crazy-dev-boyz.png'

const AboutUs = () => {
    const firebase = useContext(FirebaseContext);
    return (
        <div>
        <NavBar>
        {/*       <h1>Let's Vest</h1> */}
        <Button to={ROUTES.LANDING}>
        <LogoLets className="logo-lets" />
        </Button>
        <ul>
        <li>
                <Button to={ROUTES.ABOUT_US} primary="true">
                      About Us
                  </Button>
                </li>
                {firebase.auth.currentUser ? (
                        <li>
                    <Button to={ROUTES.PROFILE} primary="true">
                        Profile
                    </Button>
                        </li>
                ) : (
                    <>
                    <li>
                    <Button to={ROUTES.SIGN_IN} secondary="true">
                        Sign In
                    </Button>
                    </li>
                    <li>
                      <Button to={ROUTES.SIGN_UP} primary="true">
                      Sign Up
                  </Button>
                    </li>
                    </>
                )}

        </ul>
    </NavBar>
    <ContentWrapper>
    <img src={CreatorsImage} />
    </ContentWrapper>
{/*
    <Banner>
        <h2>
            Everyone <s>can</s> <u>should</u> invest.
        </h2>
        <p>
            A wonderful serenity has taken possession of my entire soul,
            like these sweet mornings with my whole heart. Created for
            the bliss of souls like mine.
        </p>
        <MoneySvg />
        <ul>
            <li>
                {firebase.auth.currentUser ? (
                    ''
                ) : (
                    <Button to={ROUTES.SIGN_UP} primary="true">
                        Get started
                    </Button>
                )}
            </li>
            <li>
                <Button to={ROUTES.DISCOVER} secondary="true">
                    Browse Stocks
                </Button>
            </li>
        </ul>
    </Banner>
    <About>
        <div>
            <InvestSvg />
            <p>Learn to invest, teach invest.</p>
        </div>
        <div>
            <ProfitsSvg />
            <p>Profits, profits, profits</p>
        </div>
    </About> */}
</div>

    )
}

export default AboutUs
