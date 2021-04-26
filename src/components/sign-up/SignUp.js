import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../firebase';
import { ContentWrapper } from './SignUpElements';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import LogoLets from '../svgs/LogoLets';

const SignUp = () => (
    <div>
        <SignUpForm />
    </div>
);

const INITIAL_STATE = {
    partOfOrg: 0, // why not just default to true?
    // partOfOrg: false, // why not just default to true?
    usernameTaken: false,
    username: '',
    organization: '',
    colors: {
        primaryColor: {
            h: 38,
            l: 50,
            s: 100,
        },
    },
    Logo: {
        Logo: '',
    },
    currency: {
        currency: 100000,
    },
    followingStocks: {
        LV: {
            regularMarketChangePercent: 150,
            regularMarketPrice: 250,
            shortName: 'lets-vest',
            symbol: 'LV',
        },
    },
    followingCrypto: {
        LVCry: {
            regularMarketChangePercent: 150,
            regularMarketPrice: 250,
            name: 'lets-vest-Cry',
            image: 'LV-CrY',
            symbol: 'LVCry',
        },
    },
    possessionStocks: {
        LV: {
            regularMarketPrice: 250,
            shortName: 'lets-vest',
            symbol: 'LV',
            amount: 1,
        },
    },
    possessionCrypto: {
        LVCry: {
            price: 250,
            percent: 150,
            name: 'lets-vest-CrY',
            image: 'LV-CrY',
            amount: 1,
        },
    },
    post: {
        posts: [
            {
                content: "Let's Vest is the best website ever!",
                username: "Let's Vest",
                liked: true,
                likeCount: 299,
                timestamp: 736180964,
            },
        ],
    },
    userSettings: {
        settings: {
            recommended: true,
            watchingCryptos: true,
            watchingSecuritys: true,
            news: false,
            hottestCrypto: false,
            hottestStocks: false,
        },
    },
    following: {
        LetsVest: {
            email: 'letsvest@vest.com',
            username: 'Vest',
        },
    },
    achievments: {
        bitcoin: {
            name: 'Bitcoin Enthusiast',
            done: false,
            desc: 'Own five bitcoins',
            reward: 'Title "Bitcoin Enthusiast"',
            show: false,
            id: 'bitcoin',
        },
        millionaire: {
            name: 'Selfmade Millionaire',
            done: false,
            desc: 'Earn your first million',
            reward: 'Title "Selfmade Millionaire"',
            show: false,
            id: 'millionaire',
        },
        dogecoin: {
            name: 'Doge Coin.. Really?',
            done: false,
            desc: 'Own 500 000k dogecoins',
            reward: 'Title "Doge Coin.. Really?"',
            show: false,
            id: 'dogecoin',
        },
    },
    picture: {
        profile_pic: 'null',
    },
    email: '',
    followerCount: 0,

    /*   list: [
        {
            email: 'letsvest@vest.com',
        },
    ], */
    emailList: { email: 'letsvest@vest.com' },

    passwordOne: '',
    passwordTwo: '',
    error: null,
    isAdmin: false,
    partOfOrganization: false,
    loading: false,
    organizationname: '',
    likedPosts: [
        {
            content: "Let's Vest is the best website ever!",
            username: "Let's Vest",
            liked: true,
            likeCount: 299,
            timestamp: 736180964,
        },
    ],
};

let activeOrganizations;
let currentEmails;
let activeOrganizationsName = [];

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    checkUsernameTaken = (str) => {
        this.setState({ usernameTaken: false });
        const usersRef = this.props.firebase.users();

        usersRef
            .orderByChild('username')
            .equalTo(str)
            .on('child_added', () => {
                this.setState({ usernameTaken: true });
            });
    };

    checkIfPartOfOrg = (str) => {
        const companysRef = this.props.firebase.admin();
        this.setState({ partOfOrganization: false });
        this.setState({ organization: '' });

        let orgStatus = false;
        let orgName = '';

        companysRef.once('value', (snapshot) => {
            /* SNAPCHAT OF ALL CHILDREN */
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                /* IF NO CHILDREN DATA OR NO ORGSTATUS YOU WILL BE SENT AWAY */
                if (!childData || orgStatus) return;
                let orgname = childSnapshot.key;

                /* PUSHES ALLA EMAILS TO AN ARRAY */
                let list = [];
                for (const key in childData.emailList) {
                    list.push(childData.emailList[key]);
                }

                /* CHECK IF THIS ARRAY CONTAINS THE WRITEN EMAIL */
                let index = list.findIndex((x) => x == str);
                /* IF IT DOES, RETURN TRUE AND EXIT THE FUCNTION */
                if (index !== -1) {
                    orgStatus = true;
                    orgName = orgname;
                }
            });
        });

        if (orgStatus) {
            this.setState({ organizationname: orgName });
            this.setState({ partOfOrganization: true });
        }
    };

    componentDidMount = async () => {
        const activeOrganizationsFirebase = await this.props.firebase.admin();

        activeOrganizationsFirebase.on('value', (snapshot) => {
            activeOrganizations = snapshot.val();
            if (!activeOrganizations) return;

            for (const key in activeOrganizations) {
                activeOrganizationsName.push({ key });
            }
        });
        /* console.log(activeOrganizationsName) */
    };

    onSubmit = (event) => {
        this.setState({ loading: true });
        const {
            username,
            email,
            passwordOne,
            isAdmin,
            currency,
            followingStocks,
            followingCrypto,
            possessionStocks,
            possessionCrypto,
            post,
            picture,
            organization,
            organizationname,
            partOfOrganization,
            emailList,
            userSettings,
            likedPosts,
            colors,
            Logo,
            achievments,
            followerCount,
        } = this.state;

        if (partOfOrganization) {
            const orgEmailList = this.props.firebase.db.ref(
                'organizations/' + organizationname + '/emails/list'
            );

            orgEmailList.on('value', (snapshot) => {
                currentEmails = snapshot.val();
                if (!currentEmails) return;

                const index = currentEmails.findIndex(
                    (obj) => obj.email == email
                );

                if (index === -1) {
                    // this.setState({ partOfOrg: false });
                    this.state.partOfOrg = false;
                } else {
                    // this.setState({ partOfOrg: true });
                    this.state.partOfOrg = true;
                }
            });
        }

        console.log(`partOfOrg: ${this.state.partOfOrg}`);

        if (this.state.partOfOrg === false) {
            this.setState({ loading: false });
            return;
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
                        followingCrypto,
                        possessionStocks,
                        possessionCrypto,
                        post,
                        picture,
                        organization,
                        userSettings,
                        likedPosts,
                        achievments,
                        followerCount,
                    });
                    // Create a user in your Firebase realtime database that is part of an organization
                } else {
                    if (isAdmin) {
                        this.props.firebase.organization(organization).update({
                            colors,
                            Logo,
                        });
                        this.props.firebase
                            .organization(
                                organization + '/users/' + authUser.user.uid
                            )
                            .set({
                                username,
                                email,
                                roles,
                                currency,
                                followingStocks,
                                followingCrypto,
                                possessionStocks,
                                possessionCrypto,
                                post,
                                picture,
                                organization,
                                userSettings,
                                likedPosts,
                                achievments,
                                followerCount,
                            });
                        this.props.firebase
                            // .organization(organization + '/emails')
                            .organization(organization)
                            .update({ emailList });
                        this.props.firebase.user(authUser.user.uid).set({
                            username,
                            email,
                            roles,
                            currency,
                            followingStocks,
                            followingCrypto,
                            possessionStocks,
                            possessionCrypto,
                            post,
                            picture,
                            organization,
                            userSettings,
                            likedPosts,
                            achievments,
                            followerCount,
                        });
                    } else {
                        this.props.firebase
                            .organization(
                                organizationname + '/users/' + authUser.user.uid
                            )
                            .set({
                                username,
                                email,
                                roles,
                                currency,
                                followingStocks,
                                followingCrypto,
                                possessionStocks,
                                possessionCrypto,
                                post,
                                picture,
                                organization: organizationname,
                                userSettings,
                                likedPosts,
                                achievments,
                                followerCount,
                            });
                        this.props.firebase.user(authUser.user.uid).set({
                            username,
                            email,
                            roles,
                            currency,
                            followingStocks,
                            followingCrypto,
                            possessionStocks,
                            possessionCrypto,
                            post,
                            picture,
                            userSettings,
                            organization: organizationname,
                            likedPosts,
                            achievments,
                            followerCount,
                        });
                    }
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
            return;
        }
        const pattern = /[^A-Za-z0-9]/;
        if (pattern.test(event.target.value)) {
            return;
        }

        /*         this.checkIfPartOfOrg(event.target.value); */

        this.setState({ [event.target.name]: event.target.value });
        this.checkUsernameTaken(event.target.value);
    };

    onChangeEmail = (event) => {
        this.checkIfPartOfOrg(event.target.value);

        // console.log(event.target.value)
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
            username === '' ||
            this.state.usernameTaken;

        return (
            <ContentWrapper partOfOrg={partOfOrganization}>
                {/*     <h1>Let's Vest</h1> */}
                <LogoLets className="logo-lets" />
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
                                    onChange={this.onChangeEmail}
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
                            <label className="label-part-of-org">
                                Organization
                                <input
                                    className="part-of-org-wrapper"
                                    disabled
                                    value={organizationname}
                                />
                            </label>
                            <label className="side-by-side">
                                Create an organization
                                <input
                                    className="checkbox"
                                    name="isAdmin"
                                    type="checkbox"
                                    checked={isAdmin}
                                    onChange={this.onChangeCheckbox}
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <rect
                                        x="4.75"
                                        y="4.75"
                                        width="14.5"
                                        height="14.5"
                                        rx="0.75"
                                        fill="black"
                                        stroke="black"
                                        strokeWidth="1.5"
                                    />
                                    <path
                                        d="M7.75 12.25L10.75 15.25L16.75 9.25"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </label>
                            {isAdmin ? (
                                <label>
                                    {' '}
                                    Name of organization
                                    <input
                                        name="organization"
                                        value={organization}
                                        onChange={this.onChange}
                                        type="text"
                                    />{' '}
                                </label>
                            ) : (
                                ''
                            )}
                            {/*     {partOfOrganization ? (
                                <label>
                                    {' '}
                                    Organization{' '}
                                   <div className="part-of-org-wrapper" > {organization}</div>
                                </label>

                            ) : (
                                null
                            )} */}

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
                        <p className="security-message">
                            <span>CAUTION</span> Do not use your real email, use
                            a fake one.
                        </p>
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
