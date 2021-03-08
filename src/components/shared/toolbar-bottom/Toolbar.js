import React from 'react';
import { ToolbarElement } from './ToolbarElements';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../../constants/routes';

const Toolbar = () => {
    return (
        <ToolbarElement>
            <ul>
                <li>
                    <Link to={ROUTES.HOME}>
                        <i className="fas fa-home"></i>Home
                    </Link>
                </li>
                <li>
                    <Link to={ROUTES.DISCOVER}>
                        <i className="fas fa-search-dollar"></i>Discover
                    </Link>
                </li>
                <li>
                    <Link to={ROUTES.SOCIAL}>
                        <i className="fas fa-users"></i>Social
                    </Link>
                </li>
                <li>
                    <Link to={ROUTES.PROFILE}>
                        <i className="fas fa-user-circle"></i>Profile
                    </Link>
                </li>
            </ul>
        </ToolbarElement>
    );
};

export default Toolbar;

// import { Link } from 'react-router-dom';

// import SignOutButton from '../SignOut';
// import * as ROUTES from '../../constants/routes';
// import * as ROLES from '../../constants/roles';

// import { AuthUserContext } from '../Session';

// const Navigation = () => (
//     <div>
//         <AuthUserContext.Consumer>
//             {authUser =>
//                 authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
//             }
//         </AuthUserContext.Consumer>
//     </div>);

// // authUser.roles[ROLES.ADMIN]
// const NavigationAuth = ({ authUser }) => (
//     <div>
//         <ul>
//             <li>
//                 <Link to={ROUTES.LANDING}>Landing</Link>
//             </li>
//             <li>
//                 <Link to={ROUTES.HOME}>Home</Link>
//             </li>
//             <li>
//                 <Link to={ROUTES.ACCOUNT}>Account</Link>
//             </li>
//             {(!!authUser.roles[ROLES.ADMIN]) && <li>
//                 <Link to={ROUTES.ADMIN}>Admin</Link>
//             </li>}
//             <li>
//                 <SignOutButton />
//             </li>
//         </ul>

//     </div >
// );
// const NavigationNonAuth = () => (
//     <ul>
//         <li>
//             <Link to={ROUTES.LANDING}>Landing</Link>
//         </li> <li>
//             <Link to={ROUTES.SIGN_IN}>Sign In</Link>
//         </li>
//     </ul>);

// export default Navigation;
