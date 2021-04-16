import { useEffect } from 'react'
import axios from 'axios'

import { useDispatch } from 'react-redux'
import { setFetchedCryptoList } from '../../redux/actions'

const FetchAllCrypto = () => {
    const dispatch = useDispatch()
   /*  const firebase = useContext(FirebaseContext);
    const user = JSON.parse(localStorage.getItem('authUser'));
    let usersRef = firebase.users();
    let userRef = firebase.user(user.uid);
    let possessionsArray = []
    let uniq;  */
/* 
    const FetchAllRelevantCrypto = async () => {
       await userRef.child('/followingCrypto').once('value', (snapshot) => {
            let followingCrypto = snapshot.val();
            if (!followingCrypto) return;
            for(const key in followingCrypto) {
                if(!followingCrypto[key].id) continue
                console.log(followingCrypto[key].id)
                possessionsArray.push(followingCrypto[key].id)
                }
        })
       await usersRef.on('child_added', function(snapshot) {
            let poss = (snapshot.val().possessionCrypto)
          for(const key in poss) {
            possessionsArray.push(poss[key].name)
            }
            uniq = [...new Set(possessionsArray)]; 
            });

            return uniq
    } */

/*     
    const cryptoCall = (uniq) => {
        if(!uniq) return
        (async () => {
            await axios
                .get(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${uniq}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`
                )
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        })();
    }; */
        /*     const FetchAllDataAsync = async () => {
            await FetchAllRelevantCrypto()
            let index = uniq.indexOf('lets-vest-CrY')
            uniq.splice(index, 1)
            
            cryptoCall(uniq)

        }
        FetchAllDataAsync()
 */

    const getCryptoInfo = async () => {
        await axios
            .get(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
            )
            .then((res) => dispatch(setFetchedCryptoList(res.data)))
            .catch((err) => console.log(err));
    };


    useEffect(() => {  
        getCryptoInfo()
    }, [])

    return null
}

export default FetchAllCrypto
