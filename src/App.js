import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import SocialPage from './components/social-page/SocialPage';
import Discover from './components/discover/Discover';
import Toolbar from './components//shared/toolbar-bottom/Toolbar';
import StockInfoPage from './components/stock-infomation/StockInformationPage';
import SignUp from './components/signup/SignUp';
import SignIn from './components/signin/SignIn';
import PasswordForget from './components/PasswordForget';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import Landingpage from './components/landingpage/Landingpage';
import { withAuthentication } from './components/session';

const App = () => {
    return (
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
                    <Toolbar />
                </Route>
                <Route exact path={ROUTES.INFO}>
                    <StockInfoPage />
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
            </Switch>
        </Router>
    );
};

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #5068F5;
    --secondary: #3E80DE;
    --third: #46C0FA;

    --background-co: #000;

    /* --primary-dark: #6B076B; */
    --primary-dark: #445df2;

    --body: #ffffff;
    --body-secondary: #f9f9f9;
    --body-third: #f2f2f2;
    --body-fourth: #575757;
    --body-fifth: #262626;

    --box-shadow-focus: 0 0 0 0.125rem #90CAF9, 0 0 0 0.375rem #E3F2FD;
  }

  body {
    margin: 0 0 56px 0;
    box-sizing: border-box;
    font-family: sans-serif;
    background-color: var(--body-secondary);
  }

  h1 {
    margin: 0;
  }
`;

export default withAuthentication(App);
