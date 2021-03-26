import React from 'react'
import { Link } from "react-router-dom";

import * as ROUTES from '../../constants/routes';

import { UserWrapper } from './UserCardElements';

const UserCard = ({img, username, total}) => {
    return (
        <UserWrapper>
            <img src={img} alt='Profilepic'/>

            <div>
                <span className="username">{username}</span>
                <span>{total ? total.toLocaleString() : 0}$</span>
            </div>
            <Link to={`/user/${username}`}>
                <i className="fas fa-user"></i>
            </Link>
        </UserWrapper>
    )
}

export default UserCard

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useParams
// } from "react-router-dom";

// // Params are placeholders in the URL that begin
// // with a colon, like the `:id` param defined in
// // the route in this example. A similar convention
// // is used for matching dynamic segments in other
// // popular web frameworks like Rails and Express.

// export default function ParamsExample() {
//   return (
//     <Router>
//       <div>
//         <h2>Accounts</h2>

//         <ul>
//           <li>
//             <Link to="/netflix">Netflix</Link>
//           </li>
//           <li>
//             <Link to="/zillow-group">Zillow Group</Link>
//           </li>
//           <li>
//             <Link to="/yahoo">Yahoo</Link>
//           </li>
//           <li>
//             <Link to="/modus-create">Modus Create</Link>
//           </li>
//         </ul>

//         <Switch>
//           <Route path="/:id" children={<Child />} />
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// function Child() {
//   // We can use the `useParams` hook here to access
//   // the dynamic pieces of the URL.
//   let { id } = useParams();

//   return (
//     <div>
//       <h3>ID: {id}</h3>
//     </div>
//   );
// }





////////////////////////
// componentDidMount() {
//     this.setState({ loading: true });
//     this.props.firebase
//     .user(this.props.match.params.id)
//     .on('value', snapshot => {
//     this.setState({
//     user: snapshot.val(),
//     loading: false,
//     });
//     });
//     }


/* const UserItem = ({ match }) => (
    <div>
        <h2>User ({match.params.id})</h2>
    </div>
    ); */