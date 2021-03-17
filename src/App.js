import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import SocialPage from './components/social-page/SocialPage';
import Discover from './components/discover/Discover';
import Toolbar from './components/shared/toolbar-bottom/Toolbar';
import StockInfoPage from './components/stock-infomation/StockInformationPage';
import CryptoInfoPage from './components/crypto-information/CryptoInformationPage'
import SignUp from './components/sign-up/SignUp';
import SignIn from './components/sign-in/SignIn';
import PasswordForget from './components/password-forget/PasswordForget';
import ProfileLikes from './components/profile/profile-likes/ProfileLikes';
import ProfilePortfolio from './components/profile/profile-portfolio/ProfilePortfolio';
import ProfilePosts from './components/profile/profile-posts/ProfilePosts';
import ProfileSettings from './components/profile/profile-settings/ProfileSettings';

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
                    <Toolbar />
                </Route>
                <Route exact path={ROUTES.DISCOVER}>
                    <Discover />
                    <Toolbar />
                </Route>
                <Route exact path={ROUTES.SOCIAL}>
                    <SocialPage />
                    <Toolbar />
                </Route>
                <Route exact path={ROUTES.PROFILE}>
                    <Profile />
                    <ProfilePortfolio />
                    <Toolbar />
                </Route>
                <Route exact path={ROUTES.INFO}>
                    <StockInfoPage />
                    <Toolbar />
                </Route>
                <Route exact path={ROUTES.INFO_CRYPTO}>
                    <CryptoInfoPage />
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
                <Route exact path={ROUTES.POSTS}>
                    <Profile />
                    <ProfilePosts />
                    <Toolbar />

                </Route>
                <Route exact path={ROUTES.LIKES}>
                    <Profile />
                    <ProfileLikes />
                    <Toolbar />
                </Route>
                <Route exact path={ROUTES.PROFILE_SETTINGS}>
                    <ProfileSettings />
                    <Toolbar />
                </Route>



            </Switch>
        </Router>
        </>
    );
};

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #5068F5;
    --secondary: #3E80DE;
    --third: #46C0FA;

    --background-co: #000;

    /* --primary-dark: #6B076B; */
    --primary-dark: #344fe5;

    --body: #ffffff;
    --body-secondary: #f9f9f9;
    --body-third: #f2f2f2;
    --body-fourth: #575757;
    --body-fifth: #262626;

    --box-shadow-focus: 0 0 0 0.125rem #90CAF9, 0 0 0 0.375rem #E3F2FD;

    --box-shadow-cards: 0 1px 3px 1px rgba(0, 0, 0, 0.2), 0 1px 3px 0 rgba(0, 0, 0, 0.19);

	--typefaces: "Inter", sans-serif;
  }

  body {
    min-height: 100vh;
    /* margin: 0 0 56px 0; */
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--typefaces);
    background-color: var(--body-secondary);
  }

    p {
        margin: 0;
    }
  h1 {
    margin: 0;
  }
`;

export default withAuthentication(App);
