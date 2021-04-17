import { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import { setFetchedStockList } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { FirebaseContext } from '../../components/firebase/context';

import {fetchUsersOrgSnapshotArray} from '../../components/shared/functions/firebase-functions'

const FetchAllStocks = () => {
        const firebase = useContext(FirebaseContext);
    const user = JSON.parse(localStorage.getItem('authUser'));
    let usersRef = firebase.users();
    let userRef = firebase.user(user.uid);
    let possessionsArray = []
    let uniq;

    const [data, setData] = useState()
    const dispatch = useDispatch()

    const FetchAllRelevantStocks = async () => {
       await userRef.child('/followingStocks').once('value', (snapshot) => {
            let followingCrypto = snapshot.val();
            if (!followingCrypto) return;
            for(const key in followingCrypto) {
                if(!followingCrypto[key].id) continue
                console.log(followingCrypto[key].id)
                possessionsArray.push(followingCrypto[key].id)
                }
        })

        let recentB = await fetchUsersOrgSnapshotArray(firebase, user.organization, '/recentlyBought', setData)
        let recentS = await fetchUsersOrgSnapshotArray(firebase, user.organization, '/recentlySold', setData)
        possessionsArray.push(recentB[0].symbol)
        possessionsArray.push(recentS[0].symbol)
     

       await usersRef.on('child_added', function(snapshot) {
            let poss = (snapshot.val().possessionStocks)
          for(const key in poss) {
            possessionsArray.push(poss[key].symbol)
            }
            uniq = [...new Set(possessionsArray)];
            });

            return uniq
    }


    const stockCall = (uniq) => {
        if(!uniq) return

        const options = {
            method: 'GET',
            url:
                'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes',
            params: { region: 'US', symbols: uniq },
            headers: {
                'x-rapidapi-key':
                    '70d9b752c8mshe5814dbaa3e86c2p180291jsn0d7793015c2f',
                'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
            },
        };


            (async () => {
                await axios
                    .request(options)
                    .then(function (response) {
                  /*       let res = response.data.quoteResponse.result */
            /*             console.log(response.data.quoteResponse.result); */
                        dispatch(setFetchedStockList(response.data.quoteResponse.result))
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
            })();

    };


        useEffect(() => {

            const FetchAllDataAsync = async () => {
                await FetchAllRelevantStocks()
                let index = uniq.indexOf('LV')
                uniq.splice(index, 1)
/*
                console.log(uniq.join())
                return */
                stockCall(uniq.join())

            }
            FetchAllDataAsync()



        }, [])


    return null
}

export default FetchAllStocks
