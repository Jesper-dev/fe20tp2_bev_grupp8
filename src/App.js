import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import Toolbar from './components/toolbar-bottom/Toolbar'
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
    --primary-color: purple;
    --secondary-color: lightpink;
    --third-color: lightblue;

    --white: #ffffff;
    --grey: #636363;
  }

  body {
    margin: 0%;
    padding: 0%;
    box-sizing: border-box;
    font-family: sans-serif;
  }
  h1 {
    margin: 0;
  }
`;

export default App;
