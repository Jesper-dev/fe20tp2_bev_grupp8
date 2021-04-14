import React, { useState, useEffect, useContext } from 'react';

import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import SocialPage from './components/social-page/SocialPage';
import Discover from './components/discover/Discover';

import Toolbar from './components/shared/toolbar-bottom/Toolbar';
import NavbarLeft from './components/shared/navbar-left/NavbarLeft';

import StockInfoPage from './components/stock-infomation/StockInformationPage';
import Trade from './components/trade/Trade';
import TradeCrypto from './components/trade/TradeCrypto';
import CryptoInfoPage from './components/crypto-information/CryptoInformationPage';
import SignUp from './components/sign-up/SignUp';
import SignIn from './components/sign-in/SignIn';
import PasswordForget from './components/password-forget/PasswordForget';
import PageNotFound from './components/404/PageNotFound';
// import ProfileWall from './components/profile/profile-wall/ProfileWall';
// import ProfilePortfolio from './components/profile/profile-portfolio/ProfilePortfolio';
// import ProfileDashboard from './components/profile/profile-dashboard/ProfileDashboard';
import ProfileSettings from './components/profile/profile-settings/ProfileSettings';
import OrganizationSettings from './components/profile/profile-dashboard/admin/OrganizationSettings';
import UserInfoCard from './components/user-info-card/UserInfoCard';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import Landingpage from './components/landingpage/Landingpage';
import { withAuthentication } from './components/session';
import { FirebaseContext } from './components/firebase';

import { setOrgColor } from './components/shared/functions/colorTheme';

const App = () => {
    const firebase = useContext(FirebaseContext);
    const user = JSON.parse(localStorage.getItem('authUser'));

    useEffect(() => {
        if (user && user.organization) {
            setOrgColor(firebase, user);
        }
    }, []);

    return (
        <>
            <Router>
                <GlobalStyle />
                <Switch>
                    <Route exact path={ROUTES.HOME}>
                        <Home />
                        <NavbarLeft />
                        <Toolbar />
                    </Route>
                    <Route path={ROUTES.DISCOVER}>
                        <Discover />
                        <NavbarLeft />
                        <Toolbar />
                    </Route>
                    <Route exact path={ROUTES.SOCIAL}>
                        <SocialPage />
                        <NavbarLeft />
                        <Toolbar />
                    </Route>
                    <Route exact path={ROUTES.USER}>
                        <UserInfoCard />
                        <NavbarLeft />
                    </Route>
                    <Route exact path={ROUTES.PROFILE}>
                        <Profile />
                        {/* <ProfilePortfolio /> */}
                        <NavbarLeft />
                        <Toolbar />
                    </Route>
                    <Route exact path={ROUTES.INFO_STOCK}>
                        <StockInfoPage />
                        <NavbarLeft />
                        <Toolbar />
                    </Route>
                    {/*    <Route exact path={ROUTES.INFO}>
                        <StockInfoPage />
                        <NavbarLeft />
                        <Toolbar />
                    </Route> */}
                    <Route exact path={ROUTES.TRADE_STOCK}>
                        <Trade />
                        <NavbarLeft />
                        <Toolbar />
                    </Route>
                    <Route exact path={ROUTES.TRADE_CRYPTO}>
                        <TradeCrypto />
                        <NavbarLeft />
                        <Toolbar />
                    </Route>
                    <Route exact path={ROUTES.INFO_CRYPTO}>
                        <CryptoInfoPage />
                        <NavbarLeft />
                        <Toolbar />
                    </Route>
                    <Route exact path={ROUTES.SIGN_IN}>
                        <SignIn />
                    </Route>
                    <Route exact path={ROUTES.SIGN_UP}>
                        <SignUp />
                    </Route>
                    <Route exact path={ROUTES.PASSWORD_FORGET}>
                        <PasswordForget />
                    </Route>
                    <Route exact path={ROUTES.LANDING}>
                        <Landingpage />
                    </Route>
                    {/*  <Route exact path={ROUTES.PORTFOLIO}>
                    <Profile />
                    <ProfilePortfolio />
                    <Toolbar />

                </Route> */}
                    <Route exact path={ROUTES.PROFILE_DASHBOARD}>
                        <Profile />
                        {/* <ProfileDashboard /> */}
                        <NavbarLeft />
                        <Toolbar />
                    </Route>
                    <Route exact path={ROUTES.PROFILE_WALL}>
                        <Profile />
                        {/* <ProfileWall /> */}
                        <NavbarLeft />
                        <Toolbar />
                    </Route>
                    <Route exact path={ROUTES.PROFILE_SETTINGS}>
                        <ProfileSettings />
                        <NavbarLeft />
                        <Toolbar />
                    </Route>
                    <Route exact path={ROUTES.ADMIN_SETTINGS}>
                        <OrganizationSettings />
                        <NavbarLeft />
                        <Toolbar />
                    </Route>
                    <Route component={PageNotFound} />
                </Switch>
            </Router>
        </>
    );
};

const GlobalStyle = createGlobalStyle`
  :root {
    --clr-black: hsl(0, 0%, 0%);
    --clr-white: hsl(0, 0%, 100%);

    --clr-almost-white: hsl(0, 0%, 98%);
    --clr-almost-black: hsl(0, 0%, 16%);

    /* Default color scheme */

	--clr-primary: hsl(231, 89%, 64%);
	--clr-primary__brighter: hsl(231, 89%, 68%);
	--clr-primary__dimmer: hsl(231, 89%, 60%);
	--clr-primary-light: hsl(231, 89%, 94%);
	--clr-primary-light__dimmer: hsl(231, 89%, 90%);



    //Darkblue-Purple-ish
    --primary: #3E80DE;
    /* --primary: #5068F5; */
    /* --primary: {colorList}; */
    //Lighter-darkblue
    --secondary: #3E80DE;
    //Light-blue
    --third: #46C0FA;

    //Light blue
    --light-blue: #e3ecfc;
    //black
    --background-co: #000;

    /* --primary-dark: #6B076B; */
    --primary-dark: #344fe5;

    --light-grey: #ccc;

    --body: #ffffff;
    --body-secondary: #f9f9f9;
    --body-third: #f2f2f2;
    --body-fourth: #575757;
    --body-fifth: #262626;

    --lighter-green: #58D7AC;
    --lighter-red: #DD577D;

    --box-shadow-focus: 0 0 0 0.125rem #90CAF9, 0 0 0 0.375rem #E3F2FD;

    --box-shadow-cards: 1px 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
    --box-shadow-cards-hover: 1px 2px 4px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.3);

	--typefaces: "Inter", sans-serif;
  }

  body {
    margin: 0;
    font-family: var(--typefaces);
    background-color: var(--clr-almost-white);
  /*   background-color: #F0F2F5; */

    &::-webkit-scrollbar-track
    {-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #CCCCCC;
    }

    &::-webkit-scrollbar{
	width: 12px;
	background-color: #CCCCCC;
    }

    &::-webkit-scrollbar-thumb{
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: var(--clr-primary-light__dimmer);
/* 	background-color: #555; */
}
  }

    p {
        margin: 0;
    }

    h1 {
        margin: 0;
    }
.my-node-enter {
  opacity: 0;
}
.my-node-enter-active {
  opacity: 1;
  transition: opacity 8500ms linear;
}
.my-node-exit {
  opacity: 1;
}
.my-node-exit-active {
  opacity: 0;
  transition: opacity 8500ms linear;
}

`;

export default withAuthentication(App);
