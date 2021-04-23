import React, { useContext } from 'react';
import { NavBar } from '../landingpage/LandingpageElements';
import { ContentWrapper, About } from './AboutUsElements';

import { Button } from '../shared/button/ButtonElements';
import * as ROUTES from '../../constants/routes';
import FirebaseContext from '../firebase/context';
import { Link } from 'react-router-dom';

import MoneySvg from '../svgs/LandingSvg';
import InvestSvg from '../svgs/InvestSvg';
import ProfitsSvg from '../svgs/ProfitsSvg';
import LogoLets from '../svgs/LogoLets';

import JonImg from '../../img/JonBild.png';
import JesperImg from '../../img/jeppe.png';
import AntonImg from '../../img/anton.png';
import KevinImg from '../../img/kevin.png';

const AboutUs = () => {
    const firebase = useContext(FirebaseContext);
    return (
        <div>
            <NavBar>
                {/*       <h1>Let's Vest</h1> */}
                <Link to={ROUTES.LANDING}>
                    <LogoLets className="logo-lets" />
                </Link>
                <ul>
                    <li>
                        <Link to={ROUTES.ABOUT_US} primary="true">
                            About Us
                        </Link>
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
                <header>
                    <h1>The vision for Let's Vest</h1>
                    <p>
                        “Let’s vest” is a software idé designed for investing
                        companies to train their employees. The fundamental idé
                        is to allow companies to register and create a personal
                        page where they can analyze their employees fictional
                        investment decisions by analyzing data and results.
                        Cryptocurrency will be included is also aviable for
                        purschase.
                        <br />
                        <br /> This is achived by allowing their employees to
                        connect their user/device to the account page. The
                        employee's/user will first and foremost use the software
                        to browse and view the stock market. But the users will
                        also be able to use a fictional currency to make
                        hypotecial investments that will change in relation to
                        the marketvalue. The software will gather data from the
                        users that the company will be able to display in a
                        custom companydata view.
                    </p>
                </header>
                <h2>management</h2>
                <About>
                    <article>
                        <img src={JonImg} />
                        <h3>Jon Sundelöf</h3>
                        <h4>CEO</h4>
                        <p>
                            Hej! Mitt namn är Jon Sundelöf. Jag är en del av
                            Let's Vest AB och älskar kod och programmering.
                        </p>
                    </article>
                    <article>
                        <img src={JesperImg} />
                        <h3>Jesper Petterson</h3>
                        <h4>CTO</h4>
                        <p>
                            Hej! Mitt namn är Jesper Petterson. Jag är en del av
                            Let's Vest AB och älskar kod och programmering.
                        </p>
                    </article>
                    <article>
                        <img src={AntonImg} />
                        <h3>Anton Larsson-Andersson</h3>
                        <h4>CFO</h4>
                        <p>
                            Hej! Mitt namn är Anton Larson-Andersson? Jag är en
                            del av Let's Vest AB och älskar kod och
                            programmering.
                        </p>
                    </article>
                    <article>
                        <img src={KevinImg} />
                        <h3>Kevin Naomi</h3>
                        <h4>CDO</h4>
                        <p>
                            Hej! Mitt namn är Kevin Naomi? Jag är en del av
                            Let's Vest AB och älskar kod och programmering.
                        </p>
                    </article>
                </About>
            </ContentWrapper>
            {/*     <ContentWrapper>
    <img src={CreatorsImage} />
    </ContentWrapper> */}
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
    );
};

export default AboutUs;
