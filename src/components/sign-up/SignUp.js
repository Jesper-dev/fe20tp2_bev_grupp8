import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../firebase';
import { ContentWrapper } from './SignUpElements';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const SignUp = () => (
    <div>
        <SignUpForm />
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    isAdmin: false,
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }
    onSubmit = (event) => {
        const { username, email, passwordOne, isAdmin } = this.state;
        const roles = {};
        if (isAdmin) {
            roles[ROLES.ADMIN] = ROLES.ADMIN;
        }
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then((authUser) => {
                // Create a user in your Firebase realtime database
                return this.props.firebase.user(authUser.user.uid).set({
                    username,
                    email,
                    roles,
                });
            })
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

    onChangeCheckbox = (event) => {
        this.setState({ [event.target.name]: event.target.checked });
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            // isAdmin,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <ContentWrapper>
                <h1>B-E-V</h1>
                <h3>Create your account</h3>
                <form onSubmit={this.onSubmit}>
                    <label>
                        Username
                        <input
                            name="username"
                            value={username}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Username"
                        />
                    </label>
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
                            name="passwordOne"
                            value={passwordOne}
                            onChange={this.onChange}
                            type="password"
                            placeholder="Password"
                        />
                    </label>
                    <label>
                        Confirm password
                        <input
                            name="passwordTwo"
                            value={passwordTwo}
                            onChange={this.onChange}
                            type="password"
                            placeholder="Confirm password"
                        />
                    </label>
                    {/*  <label>
                        Admin:
                        <input
                            name="isAdmin"
                            type="checkbox"
                            checked={isAdmin}
                            onChange={this.onChangeCheckbox}
                        />
                    </label> */}
                    <button disabled={isInvalid} type="submit">
                        Sign Up
                    </button>
                    {error && <p className="error-message">{error.message}</p>}

                    <p>
                        Already have an account?{' '}
                        <Link to={ROUTES.SIGN_IN}>Sign in</Link>
                    </p>
                </form>
            </ContentWrapper>
        );
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUp;

export { SignUpForm, SignUpLink };
