import React, {useState} from 'react'
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../firebase/firebase';

import * as ROUTES from '../../constants/routes';
//import * as ROLES from '../../../constants/roles';
import { ContentWrapper } from "./SignupElements"

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    isAdmin: false
};

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    return (
        <ContentWrapper>
            <h1>Let's Vest!</h1>
            <form>
                <h1>Signup</h1>
                <div>
                    <label>Email</label>
                    <input type="email" />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" onKeyDown={(e) => setPasswordOne(e.target.key)} value={passwordOne}/>
                 </div>
                 <span>{passwordOne}</span>
            </form>
            <button>GOOGLE</button>
            <button>FACEBOOK</button>
        </ContentWrapper>
    )
}

export default Signup
