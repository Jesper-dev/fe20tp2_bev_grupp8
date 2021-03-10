import React from 'react';
import { ToolbarElement } from './ToolbarElements';
import { NavLink } from 'react-router-dom';

import SignOutButton from '../../sign-out/SignOut';
import * as ROUTES from '../../../constants/routes';
import * as ROLES from '../../../constants/roles';

import { AuthUserContext } from '../../session';

const Toolbar = ({ authUser }) => {
    return (
        // <ToolbarElement>
        //     <ul>
        //         <li>
        //             <Link to={ROUTES.HOME}>
        //                 <i className="fas fa-home"></i>Home
        //             </Link>
        //         </li>
        //         <li>
        //             <Link to={ROUTES.DISCOVER}>
        //                 <i className="fas fa-search-dollar"></i>Discover
        //             </Link>
        //         </li>
        //         <li>
        //             <Link to={ROUTES.SOCIAL}>
        //                 <i className="fas fa-users"></i>Social
        //             </Link>
        //         </li>
        //         <li>
        //             <Link to={ROUTES.PROFILE}>
        //                 <i className="fas fa-user-circle"></i>Profile
        //             </Link>
        //         </li>
        //     </ul>
        // </ToolbarElement>
        <AuthUserContext.Consumer>
            {(authUser) =>
                authUser ? (
                    <NavigationAuth authUser={authUser} />
                ) : (
                    <NavigationNonAuth />
                )
            }
        </AuthUserContext.Consumer>
    );
};

// authUser.roles[ROLES.ADMIN]
const NavigationAuth = () => (
    <div>
        <ToolbarElement>
            <ul>
                <li>
                    <NavLink to={ROUTES.HOME}>
                        <i className="fas fa-home"></i>Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to={ROUTES.DISCOVER}>
                        <i className="fas fa-search-dollar"></i>Discover
                    </NavLink>
                </li>
                <li>
                    <NavLink to={ROUTES.SOCIAL}>
                        <i className="fas fa-users"></i>Social
                    </NavLink>
                </li>
                <li>
                    <NavLink to={ROUTES.PROFILE}>
                        <i className="fas fa-user-circle"></i>Profile
                    </NavLink>
                </li>
            </ul>
        </ToolbarElement>
    </div>
);
const NavigationNonAuth = () => (
    <ToolbarElement>
        <ul>
            <li>
                <NavLink to={ROUTES.SIGN_IN}>
                    <i className="fas fa-home"></i>Home
                </NavLink>
            </li>
            <li>
                <NavLink to={ROUTES.SIGN_IN}>
                    <i className="fas fa-search-dollar"></i>Discover
                </NavLink>
            </li>
            <li>
                <NavLink to={ROUTES.SIGN_IN}>
                    <i className="fas fa-users"></i>Social
                </NavLink>
            </li>
            <li>
                <NavLink to={ROUTES.SIGN_IN}>
                    <i className="fas fa-user-circle"></i>Profile
                </NavLink>
            </li>
        </ul>
    </ToolbarElement>
);

export default Toolbar;
