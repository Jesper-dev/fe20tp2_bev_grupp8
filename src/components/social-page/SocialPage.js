import React from 'react';

import { withAuthorization } from '../session'; //must be logged in to see content

const SocialPage = () => {
    return <div>Social-Page</div>;
};

const condition = (authUser) => !!authUser; //if logged in is not true, send user to sign in page

export default withAuthorization(condition)(SocialPage); //check to see if you are signed in
