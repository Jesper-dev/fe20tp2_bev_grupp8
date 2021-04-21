import React from 'react';
import { withFirebase } from '../firebase';

import { SignOutBtnElement } from './SignOutElements'

const SignOutButton = ({ firebase }) => (
    <SignOutBtnElement type="button" onClick={firebase.doSignOut}>
        <i className="fas fa-sign-out-alt"></i> Sign Out
    </SignOutBtnElement>
);

export default withFirebase(SignOutButton);
