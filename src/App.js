import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import SocialPage from './components/social-page/SocialPage'
import Discover from './components/search/Search'
import Toolbar from './components//shared/toolbar-bottom/Toolbar'
import StockInfoPage from './components/stock-infomation/StockInformationPage'
import { createGlobalStyle } from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {
    return (
        <Router>
              <GlobalStyle />
                <Switch>
                  <Route exact path="/">
                    <Home />
                    <Toolbar />
                  </Route>
                  <Route exact path="/discover">
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
                </Switch>
        </Router>
    );
};

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: purple;
    --secondary: lightpink;
    --third: lightblue;

    --primary-dark: #6B076B;

    --body: #ffffff; 
    --body-secondary: #575757;
  }

  body {
    margin: 0 0 56px 0;
    box-sizing: border-box;
    font-family: sans-serif;
  }

  h1 {
    margin: 0;
  }
`;


export default App;
