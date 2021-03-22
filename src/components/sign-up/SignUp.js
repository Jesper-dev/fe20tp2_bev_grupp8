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
    organization: '',
    currency: {
        currency: 100000,
    },
    followingStocks: {
        array: [
            {
                regularMarketChangePercent: 150,
                regularMarketPrice: 250,
                shortName: 'lets-vest',
                symbol: 'LV',
            },
        ],
    },
    post: {
        posts: [
            {
                content: "Let's Vest is the best website ever!",
                username: "Let's Vest",
                likes: 299,
                timestamp: 736180964,
            },
        ],
    },
    picture: {
        profile_pic:
            'data:image/png;base64,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',
    },
    email: '',

    list: [
        {
            email: 'letsvest@vest.com'
        },
    ],
    passwordOne: '',
    passwordTwo: '',
    error: null,
    isAdmin: false,
    partOfOrganization: false,
    loading: false,
    organizationname: ''
};

let activeOrganizations;
let currentEmails;
let activeOrganizationsName = [];


class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    componentDidMount = () => {
      /*   console.log('hello') */
            const activeOrganizationsFirebase = this.props.firebase.db.ref('organizations/');

            activeOrganizationsFirebase.on('value', (snapshot) => {
                activeOrganizations = snapshot.val();
                if (!activeOrganizations) return;

                   for (const key in activeOrganizations) {
                       activeOrganizationsName.push({ key });
                   }
            });

    }

    onSubmit = (event) => {
        this.setState({ loading: true });
        const {
            username,
            email,
            passwordOne,
            isAdmin,
            currency,
            followingStocks,
            post,
            picture,
            organization,
            organizationname,
            partOfOrganization,
            list
        } = this.state;
        //IF ENTERED EMAIL exists in Comp email
        if(partOfOrganization){
            let exists = false;
            const orgEmailList = this.props.firebase.db.ref('organizations/' + organizationname + '/emails/list' );

            orgEmailList.on('value', (snapshot) => {
                currentEmails = snapshot.val();
                if (!currentEmails) return;

                for(let i = 0; i < currentEmails.length; i++){
                    if(currentEmails[i].email === email){
                        console.log("It exist")

                        this.setState({ organization: organizationname });
                        console.log(organizationname)
                        console.log(organization)
                        exists = true;
                    } else {
                        console.log("It doesnt exist")
                        exists = false;
                    }
                }
                if(!exists) return
            });


        }

        const roles = {};
        if (isAdmin) {
            roles[ROLES.ADMIN] = ROLES.ADMIN;
        } else if (partOfOrganization) {
            roles[ROLES.EMPLOYEE] = ROLES.EMPLOYEE;
        }
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then((authUser) => {
                // Create a user in your Firebase realtime database that is not part of an organization
                if (!isAdmin && !partOfOrganization) {
                    return this.props.firebase.user(authUser.user.uid).set({
                        username,
                        email,
                        roles,
                        currency,
                        followingStocks,
                        post,
                        picture,
                        organization,
                    });
                    // Create a user in your Firebase realtime database that is part of an organization
                } else {
                    // https://grupp8-c364e-default-rtdb.firebaseio.com/organizations/Lets%20Vest/users
                    this.props.firebase
                        .organization(
                          isAdmin ? organization + '/users/' + authUser.user.uid : organizationname + '/users/' + authUser.user.uid
                        )
                        .set({
                            username,
                            email,
                            roles,
                            currency,
                            followingStocks,
                            post,
                            picture,
                            organization
                        });
                if(!partOfOrganization){
                    this.props.firebase.organization(
                        organization + '/emails'
                    )
                    .set({ list })
                    }
                    this.props.firebase.user(authUser.user.uid).set({
                        username,
                        email,
                        roles,
                        currency,
                        followingStocks,
                        post,
                        picture,
                        organization,
                    });
                }
            })

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
        if (/\s/.test(event.target.value)) {
            // It has any kind of whitespace
            // göra error
            return
        }
        this.setState({ [event.target.name]: event.target.value });
    };

    onChangeCheckbox = (event) => {
        if (
            event.target.name === 'partOfOrganization' &&
            this.state.isAdmin === true
        ) {
            this.setState({ isAdmin: false });
        } else if (
            event.target.name === 'isAdmin' &&
            this.state.partOfOrganization === true
        ) {
            this.setState({ partOfOrganization: false });
        }
        this.setState({ [event.target.name]: event.target.checked });
    };



    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            isAdmin,
            organization,
            partOfOrganization,
            organizationname,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <ContentWrapper>
                <h1>Let's Vest</h1>
                {this.state.loading ? (
                    'Loading...'
                ) : (
                    <>
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
                            <label class="side-by-side">
                                Create an organization
                                <input
                                    name="isAdmin"
                                    type="checkbox"
                                    checked={isAdmin}
                                    onChange={this.onChangeCheckbox}
                                />
                            </label>
                            {isAdmin ? (

                                <label>
                                    {' '}
                                    Name of organization
                                    <input
                                        name="organization"
                                        value={organization}
                                        onChange={this.onChange}
                                    />{' '}
                                </label>
                            ) : (
                                ''
                            )}

                            <label class="side-by-side">
                                Part of an organization
                                <input
                                    name="partOfOrganization"
                                    type="checkbox"
                                    checked={partOfOrganization}
                                    onChange={this.onChangeCheckbox}
                                />
                            </label>
                            {partOfOrganization ? (
                                <label>
                                    {' '}
                                    Which organization?{' '}
                                    <select
                                        name="organizationname"
                                        value={organizationname}
                                        onChange={this.onChange}
                                    >
                                        {activeOrganizationsName.map(
                                            (item, i) => {
                                                return (
                                                    <option key={i}>
                                                        {item.key}
                                                    </option>
                                                );
                                            }
                                        )}
                                    </select>
                                </label>
                            ) : (
                                ''
                            )}

                            <button disabled={isInvalid} type="submit">
                                Sign Up
                            </button>
                            {error && (
                                <p className="error-message">{error.message}</p>
                            )}

                            <p>
                                Already have an account?{' '}
                                <Link to={ROUTES.SIGN_IN}>Sign in</Link>
                            </p>
                        </form>
                    </>
                )}
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
