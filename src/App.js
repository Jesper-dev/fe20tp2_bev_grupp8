import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import SocialPage from './components/social-page/SocialPage';
import Discover from './components/search/Search';
import Toolbar from './components//shared/toolbar-bottom/Toolbar';
import StockInfoPage from './components/stock-infomation/StockInformationPage';
import Signup from './components/signgup/Signup';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import Landingpage from './components/landingpage/Landingpage';

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
                <Route exact path="/social">
                    <SocialPage />
                    <Toolbar />
                </Route>
                <Route exact path="/profile">
                    <Profile />
                    <Toolbar />
                </Route>
                <Route exact path="/info">
                    <StockInfoPage />
                    <Toolbar />
                </Route>
                <Route exact path="/signup">
                    <Signup />
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
    --primary: purple;
    --secondary: lightpink;
    --third: lightblue;

    --background-co: #000;

    --primary-dark: #6B076B;

    --body: #ffffff;
    --body-secondary: #575757;
    --body-third: #f5f5f5;

    --box-shadow-focus: 0 0 0 0.125rem #90CAF9, 0 0 0 0.375rem #E3F2FD;
  }

  body {
    margin: 0 0 56px 0;
    box-sizing: border-box;
    font-family: sans-serif;
    background-color: var(--body-third)
  }

  h1 {
    margin: 0;
  }
`;

export default App;
