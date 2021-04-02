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
import CryptoInfoPage from './components/crypto-information/CryptoInformationPage';
import SignUp from './components/sign-up/SignUp';
import SignIn from './components/sign-in/SignIn';
import PasswordForget from './components/password-forget/PasswordForget';
// import ProfileWall from './components/profile/profile-wall/ProfileWall';
// import ProfilePortfolio from './components/profile/profile-portfolio/ProfilePortfolio';
// import ProfileDashboard from './components/profile/profile-dashboard/ProfileDashboard';
import ProfileSettings from './components/profile/profile-settings/ProfileSettings';
import UserInfoCard from './components/user-info-card/UserInfoCard';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import Landingpage from './components/landingpage/Landingpage';
import { withAuthentication } from './components/session';

const App = () => {
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
                    <Route exact path={ROUTES.TRADE}>
                        <Trade />
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
                </Switch>
            </Router>
        </>
    );
};

const GlobalStyle = createGlobalStyle`
  :root {
      //Darkblue-Purple-ish
    --primary: #5068F5;
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
  }

  #root {
    display: flex;
    min-height: 100vh;
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
