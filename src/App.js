import React, {useState, useEffect, useContext} from "react"

import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import SocialPage from './components/social-page/SocialPage';
import Discover from './components/discover/Discover';

// import DiscoverCryptoList from './components/discover/discover-cryptolist/DiscoverCryptoList'
// import DiscoverStocksList from './components/discover/discover-stocklist/DiscoverStocksList'

import Toolbar from './components/shared/toolbar-bottom/Toolbar';
import NavbarLeft from './components/shared/navbar-left/NavbarLeft';
import StockInfoPage from './components/stock-infomation/StockInformationPage';
import Trade from './components/stock-infomation/trade/Trade';
import TradeCrypto from './components/stock-infomation/trade/TradeCrypto';
import CryptoInfoPage from './components/crypto-information/CryptoInformationPage';
import SignUp from './components/sign-up/SignUp';
import SignIn from './components/sign-in/SignIn';
import PasswordForget from './components/password-forget/PasswordForget';
// import ProfileWall from './components/profile/profile-wall/ProfileWall';
// import ProfilePortfolio from './components/profile/profile-portfolio/ProfilePortfolio';
// import ProfileDashboard from './components/profile/profile-dashboard/ProfileDashboard';
import ProfileSettings from './components/profile/profile-settings/ProfileSettings';
import OrganizationSettings from './components/profile/profile-dashboard/admin/OrganizationSettings'
import UserInfoCard from './components/user-info-card/UserInfoCard';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import Landingpage from './components/landingpage/Landingpage';
import { withAuthentication } from './components/session';
import { FirebaseContext } from "./components/firebase";

const App = () => {
    const firebase = useContext(FirebaseContext)
    const user = JSON.parse(localStorage.getItem('authUser'));
    const [colorList, setColorList] = useState([])
    const getColors = () => {
        firebase.organization(user.organization).child("/colors").on('value', (snapshot) => {
            const data = snapshot.val();
            let colors = []
            for (const key in data) {
                const obj = {
                    name: key,
                    color: data[key].value,
                };
                colors.push(obj);
            }

            console.log(colors)
            setColorList(colors)
            setColor(colors)
        })


    }

    console.log(colorList)

    const setColor = (array) => {
        console.log('Color is: ', array[0].color)
        const body = document.body;
        body.style.setProperty('--primary', array[0].color);
        body.style.setProperty('--secondary', array[1].color);
        body.style.setProperty('--third', array[2].color);
    }

    useEffect(() => {
        getColors()
    }, [])

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
                </Switch>
            </Router>
        </>
    );
};


const GlobalStyle = createGlobalStyle`
  :root {
        --clr-black: #000;
        --clr-white: #fff;

        --clr-almost-white: #eee;

        --clr-primary-light: #ddd;
        --clr-primary-lighter: #ccc;
        --clr-primary: #555;
        --clr-primary-darker: #444;
        --clr-primary-dark: #222;

    //Darkblue-Purple-ish
    --primary: #5068F5;
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

    --box-shadow-cards: 1px 2px 4px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.16);

	--typefaces: "Inter", sans-serif;
  }

  body {
    margin: 0;
    font-family: var(--typefaces);
    background-color: var(--body-secondary);
    background-color: var(--clr-almost-white);

            &::-webkit-scrollbar-track {
            width: 10px;
            background-color: var(--primary);
            box-shadow: inset 0 0 5px var(--primary);
            border-radius: 10px;
            }
         &::-webkit-scrollbar {
            background-color: var(--third);
            width: 10px;
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
