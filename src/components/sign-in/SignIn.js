import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import { SignUpLink } from '../sign-up/SignUp';
// import { PasswordForgetLink } from '../password-forget/PasswordForget';
import { ContentWrapper, SignLink } from './SignInElements';
/* import { Link } from 'react-router-dom'; */

import { withFirebase } from '../firebase';
import * as ROUTES from '../../constants/routes';

import LogoLets from '../svgs/LogoLets'

// import { withAuthorization } from "../session";

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
	loading: false
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
		this.setState({ loading: true });
        const { email, password } = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
				this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch((error) => {
                this.setState({ error, loading: false });
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
           {/*      <h1>Let's Vest</h1> */}
                <LogoLets className="logo-lets" />
				{this.state.loading ? "Loading..." :
				                <form onSubmit={this.onSubmit}>
								<label>
									E-mail
									<input
										name="email"
										value={email}
										onChange={this.onChange}
										type="email"
										placeholder="E-mail address"
									/>
								</label>
								<label>
									Password
									<input
										name="password"
										value={password}
										onChange={this.onChange}
										type="password"
										placeholder="Password"
									/>
								</label>
								<button disabled={isInvalid} type="submit">
									Sign In
								</button>
								{error && <p className="error-message">{error.message}</p>}

								<p>
									Don't have an account?{' '}
									<SignLink to={ROUTES.SIGN_UP}>Sign Up</SignLink>
								</p>
							</form>}
            </ContentWrapper>
        );
    }
}
const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignIn;
// const condition = (authUser) => !!authUser;
// export default withAuthorization(condition)(SignIn);

export { SignInForm };
