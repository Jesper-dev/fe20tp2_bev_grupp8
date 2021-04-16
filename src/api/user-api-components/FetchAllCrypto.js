import React,{ useEffect, useContext } from 'react'

import { FirebaseContext } from '../../components/firebase/context'

const FetchAllCrypto = () => {
    const firebase = useContext(FirebaseContext);
    const user = JSON.parse(localStorage.getItem('authUser'));

    useEffect(() => {  

   let dataRef = firebase.users();
   let possessionsArray = []

//    usersRef
//    .orderByChild('username')
//    .equalTo(str)
//    .on('child_added', () => {
//        this.setState({ usernameTaken: true });
//    });


    dataRef.on('child_added', function(snapshot) {
  //data.val() will contain the child data, such as the email address
  //append it to a text file here (for example), save to disk etc.
  let poss = (snapshot.val().possessionStocks)
  console.log(poss)
  for(const key in poss) {
    possessionsArray.push(poss[key].symbol)
}
 
    });

    let uniq = [...new Set(possessionsArray)]; 
    
    console.log(uniq) 
    }, [
    ])

    return (
        <div>
            
        </div>
    )
}

export default FetchAllCrypto
