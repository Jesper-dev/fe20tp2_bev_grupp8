import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import { createGlobalStyle } from 'styled-components';
import Recommendations from './api/recommendations/Recommendations';
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
                  </Route>
                  <Route exact path="/profile">
                    <Profile />
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
