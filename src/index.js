import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux';
import allReducers from './redux/reducers';
import { Provider } from 'react-redux';

import Firebase from './components/firebase/firebase';
import { FirebaseContext } from './components/firebase/context';

const store = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <FirebaseContext.Provider value={new Firebase()}>
                <App />
            </FirebaseContext.Provider>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);
