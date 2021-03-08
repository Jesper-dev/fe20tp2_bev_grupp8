import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SignUpLink } from '../signup/SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { ContentWrapper, SignLink } from '../signin/SigninElements';
/* import { Link } from 'react-router-dom'; */

import { withFirebase } from '../firebase';
import * as ROUTES from '../../constants/routes';

const SignIn = () => (
    <div>
        <SignInForm />
        {/*     <PasswordForgetLink />
        <SignUpLink /> */}
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch((error) => {
                this.setState({ error });
            });
        event.preventDefault();
    };

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;
        const isInvalid = password === '' || email === '';

        return (
            <ContentWrapper>
                <h1>B-E-V</h1>
                <form onSubmit={this.onSubmit}>
                    <input
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Email Address"
                    />
                    <input
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Password"
                    />
                    <button disabled={isInvalid} type="submit">
                        Sign In
                    </button>
                    {error && <p>{error.message}</p>}

                    <p>
                        Don't have an account?{' '}
                        <SignLink to={ROUTES.SIGN_UP}>Signup</SignLink>
                    </p>
                </form>
            </ContentWrapper>
        );
    }
}
const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignIn;

export { SignInForm };
