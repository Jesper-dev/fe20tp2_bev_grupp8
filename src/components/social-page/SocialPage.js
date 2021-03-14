import React, { useState, useEffect } from 'react';
import axios from "axios"

import SearchBar from '../shared/search-bar/SearchBar'

import { withAuthorization } from '../session'; //must be logged in to see content
let userList = []
const SocialPage = () => {
    const [users, setUsers] = useState({})
    useEffect(() => {
        userList = []
        axios.get('https://grupp8-c364e-default-rtdb.firebaseio.com/users.json')
            .then(res => setUsers(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <SearchBar />
    )
}
const condition = (authUser) => !!authUser; //if logged in is not true, send user to sign in page

export default withAuthorization(condition)(SocialPage); //check to see if you are signed in
