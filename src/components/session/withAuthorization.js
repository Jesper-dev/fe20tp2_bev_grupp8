import React from 'react';

import { withRouter } from 'react-router-dom';
import { withFirebase } from '../firebase';
import * as ROUTES from '../../constants/routes';
import AuthUserContext from './context';

/* const withAuthorization = condition => Component => {

    const WithAuthorization = (props) => {
        const authUser = useContext(AuthUserContext);
        const { history, firebase } = props;

        useEffect(() => {
            const listener = firebase.onAuthUserListener(
                authUser => {
                    if (!condition(authUser)) {
                        history.push(ROUTES.SIGN_IN);
                    }
                },
                () => history.push(ROUTES.SIGN_IN),
            );
            return () => {
                listener();
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
        return (
            condition(authUser) ? <Component {...props} /> : null
        );
    }
    return withRouter(withFirebase(WithAuthorization)) */

const withAuthorization = condition => Component => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            this.listener = this.props.firebase.onAuthUserListener(
                authUser => {
                    if (!condition(authUser)) {
                        this.props.history.push(ROUTES.SIGN_IN);
                    }
                },
                () => this.props.history.push(ROUTES.SIGN_IN),
            );

        }
        componentWillUnmount() {
            this.listener();
        }
        render() {
            return (
                <AuthUserContext.Consumer>
                    {authUser =>
                        condition(authUser) ? <Component {...this.props} /> : null
                    }
                </AuthUserContext.Consumer >);
        }
    }
    return withRouter(withFirebase(WithAuthorization));
};

export default withAuthorization;